import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from '../../shared/globals';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {
  constructor(public globalVariable: GlobalVariable) {}

  ngOnInit(): void {
    this.globalVariable.studentNameGlobal;
  }

  // onChange(event): void {
  //   console.log('event', event);
  //   const selectedFiles = <FileList>event.srcElement.files;
  //   document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;
  // }
}
