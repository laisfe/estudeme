import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from '../../shared/globals';
import { StudentsList } from './models/students-types';
import { StudentsService } from './students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  dataList: StudentsList[] = [];

  constructor(
    private globalVariable: GlobalVariable,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.getStudentsList();
  }

  teste(studentName: string): void {
    this.globalVariable.studentNameGlobal = studentName;
    this.globalVariable.studentFullNameGlobal = 'Naruto Uzumaki';
  }

  getStudentsList(): void {
    this.studentsService.getStudentsList().subscribe(
      (response: StudentsList[]) => {
        this.dataList = response;
      },
      (error) => {
        console.log('***error', error);
      }
    );
  }
}
