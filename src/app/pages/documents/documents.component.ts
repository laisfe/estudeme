import { Component, OnInit } from '@angular/core';
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
    private service: DocumentsService
  ) { }

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
        .subscribe(() => { });
    }
  }

  returnFiles(): void {
    console.log('entrei no returnFiles')
    this.service.select(environment.BASE_URL + '/documents')
      .subscribe((documents) => {
        console.log('documents', documents['body'])
        this.documentsList = documents['body'];
      }, (error) => {
        console.log('error', error)
      })
  }
}
