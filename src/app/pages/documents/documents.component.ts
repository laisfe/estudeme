import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GlobalVariable } from 'src/app/shared/globals';
import { StudentsList } from 'src/app/shared/models/students-types';
import { StudentsService } from 'src/app/shared/services/students.service';
import { environment } from 'src/environments/environment';
import { DocumentsService } from './documents.service';
import { Documents } from './models/documents';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {
  files: Set<File>;
  documentsList: Documents[];
  studentsList: StudentsList[] = [];
  studentName: string;
  loading: boolean = false;
  uid: string;
  idStudent: number;

  constructor(
    private service: DocumentsService,
    private studentsService: StudentsService,
    private angularFireAuth: AngularFireAuth,
    public globalVariable: GlobalVariable,
    private router: Router
  ) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid;
      }
    });
    this.globalVariable.personType;
    this.globalVariable.studentIdGlobal;
    this.returnFiles();
    this.searchStudent();
  }

  onChange(event): void {
    this.files = new Set();
    const selectedFiles = <FileList>event.srcElement.files;
    document.getElementById('customFileLabel').innerHTML =
      selectedFiles[0].name;
    this.files.add(selectedFiles[0]);
  }

  onUpload(): void {
    this.loading = true;
    if (this.files && this.files.size > 0) {
      this.service
        .upload(this.files, environment.BASE_URL + '/documents')
        .subscribe(() => {
          setTimeout(() => {
            this.loading = false;
            window.location.reload();
          }, 4000);
        });
    }
  }

  returnFiles(): void {
    this.service.select(environment.BASE_URL + '/documents').subscribe(
      (documents) => {
        this.documentsList = documents['body'];
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  onDownloadFile(id: number, documentName: string): void {
    this.service.download(environment.BASE_URL + `/documents/${id}`).subscribe(
      (response: any) => {
        const documentNameSplitted = documentName.split('/')[2];
        this.service.handleFile(response, documentNameSplitted);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  searchStudent(): void {
    this.loading = true;
    setTimeout(() => {
      this.studentsService.getStudentsList().subscribe(
        async (students: StudentsList[]) => {
          this.studentsList = students;
          const emailUser = (await this.angularFireAuth.currentUser).email;
          this.studentsList.forEach((element) => {
            if (element.email === emailUser) {
              this.studentName = element.nome;
            }
            this.loading = false;
          });
        },
        (error) => {
          console.log('***error', error);
          this.loading = false;
        }
      );
    }, 1000);
  }

  createActivity(): void {
    this.router.navigate(['/newActivity']);
  }

  reports(): void {
    this.loading = true;
    this.router.navigate([`/reports/${this.globalVariable.studentIdGlobal}`]);
  }
}
