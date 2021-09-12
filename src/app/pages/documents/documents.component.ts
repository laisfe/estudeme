import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GlobalVariable } from '../../shared/globals';
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



  constructor(
    public globalVariable: GlobalVariable,
    private service: DocumentsService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  inputFilesForm = this.fb.group({
    inputFile: ['', Validators.required]
  });

  ngOnInit(): void {
    this.globalVariable.studentNameGlobal;
    this.returnFiles();
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

        });
      window.location.reload()
    }
  }

  returnFiles(): void {
    this.service.select(environment.BASE_URL + '/documents')
      .subscribe((documents) => {
        this.documentsList = documents['body'];
      }, (error) => {
        console.log('error', error)
      })
  }

  onDownloadFile(id: number, documentName: string): void {
    this.service.download(environment.BASE_URL + `/documents/${id}`)
      .subscribe((response: any) => {
        const documentNameSplitted = documentName.split('/')[2]
        this.service.handleFile(response, documentNameSplitted);
      }, (error) => {
        console.log('error', error)
      })
  }
}
