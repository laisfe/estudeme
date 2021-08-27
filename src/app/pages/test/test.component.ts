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
  selectedAnswer: string;
  expectedAnswer: string;
  correctAnswer: boolean;

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.getStudentsList();
  }

  getStudentsList(): void {
    this.testService.getQuestionsList().subscribe(
      (questions: QuestionsList[]) => {
        this.questionsList = questions;
        console.log('questions', questions)
      },
      (error) => {
        console.log('***error', error);
      }
    );
  }

  onItemChange(selectedAnswer: string, expectedAnswer: string) {
    this.selectedAnswer = selectedAnswer;
    this.expectedAnswer = expectedAnswer;
  }

  verifyAnswer(): void {
    if (this.selectedAnswer === this.expectedAnswer) {
      this.correctAnswer = true;
    } else {
      this.correctAnswer = false;
    }
  }
}
