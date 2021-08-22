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
  studentsList: StudentsList[] = [];

  constructor(
    private globalVariable: GlobalVariable,
    private studentsService: StudentsService,
  ) {}

  ngOnInit(): void {
    this.getStudentsList();
  }

  passStudentName(studentName: string): void {
    this.globalVariable.studentNameGlobal = studentName;
  }

  getStudentsList(): void {
    this.studentsService.getStudentsList().subscribe(
      (students: StudentsList[]) => {
        this.studentsList = students;
      },
      (error) => {
        console.log('***error', error);
      }
    );
  }
}
