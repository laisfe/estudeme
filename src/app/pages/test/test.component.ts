import { Component, OnInit } from '@angular/core';
import { AlternativesList, QuestionsList } from './models/questions';
import { TestService } from './test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  questionsList: QuestionsList[] = [];
  alternativesList: AlternativesList;

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.getStudentsList();
  }

  getStudentsList(): void {
    this.testService.getQuestionsList().subscribe(
      (questions: QuestionsList[]) => {
        this.questionsList = questions;
      },
      (error) => {
        console.log('***error', error);
      }
    );
  }
}
