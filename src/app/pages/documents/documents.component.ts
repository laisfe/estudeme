import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { StudentsList } from 'src/app/shared/models/students-types';
import { StudentsService } from 'src/app/shared/services/students.service';
import { environment } from 'src/environments/environment';
import { DocumentsService } from './documents.service';
import { Documents } from './models/documents';

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

  constructor(
    private service: DocumentsService,
    private studentsService: StudentsService,
    private angularFireAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
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
    if (this.files && this.files.size > 0) {
      this.service
        .upload(this.files, environment.BASE_URL + '/documents')
        .subscribe(() => {
          setTimeout(() => {
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
    setTimeout(() => {
      this.studentsService.getStudentsList().subscribe(
        async (students: StudentsList[]) => {
          this.studentsList = students;
          const emailUser = (await this.angularFireAuth.currentUser).email;
          this.studentsList.forEach((element) => {
            if (element.email === emailUser) {
              this.studentName = element.nome;
            }
          });
        },
        (error) => {
          console.log('***error', error);
        }
      );
    }, 1000);
  }
}
