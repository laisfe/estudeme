import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from '../../shared/globals';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  constructor(private globalVariable: GlobalVariable) {}

  ngOnInit(): void {}

  teste(studentName: string): void {
    this.globalVariable.studentNameGlobal = studentName;
    this.globalVariable.studentFullNameGlobal = 'Naruto Uzumaki'
  }
}
