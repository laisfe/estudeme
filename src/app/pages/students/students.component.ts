import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from '../../shared/globals';
import { StudentsList } from '../../shared/models/students-types';
import { StudentsService } from '../../shared/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  studentsList: StudentsList[] = [];
  loading: boolean = false;

  constructor(
    private globalVariable: GlobalVariable,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.getStudentsList();
  }

  passStudentName(studentName: string): void {
    this.globalVariable.studentNameGlobal = studentName;
  }

  getStudentsList(): void {
    this.loading = true;
    this.studentsService.getStudentsList().subscribe(
      (students: StudentsList[]) => {
        this.loading = false;
        this.studentsList = students;
      },
      (error) => {
        this.loading = false;
        console.log('***error', error);
      }
    );
  }
}
