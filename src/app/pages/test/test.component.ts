import { Component, OnInit } from '@angular/core';
import { AnswersList, Avaliation } from './models/answers';
import { AlternativesList, Test } from './models/questions';
import { TestService } from './test.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import { StudentsService } from 'src/app/shared/services/students.service';
import { StudentsList } from 'src/app/shared/models/students-types';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  questionsList = [];
  alternativesList: AlternativesList;
  selectedAnswer: string;
  expectedAnswer: string;
  correctAnswer: boolean;
  answerList: AnswersList[] = [];
  idTest: string;
  loading: boolean = false;
  nextQuestion: number;
  time: number = 0;
  interval;
  play: boolean;

  constructor(
    private testService: TestService,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.getQuestionsList();
    this.nextQuestion = 0;
  }

  startTimer(): void {
    this.play = true;
    this.interval = setInterval(() => {
      this.time++;
    }, 1000);
  }

  getQuestionsList(): void {
    this.loading = true;
    this.testService.getTest('6141ffe2631c5ecb56737721').subscribe(
      (questions: Test) => {
        this.idTest = questions.idProva;
        this.questionsList = questions.questoes;
        this.loading = false;
        this.startTimer();
      },
      (error) => {
        console.log('***error', error);
        this.loading = false;
      }
    );
  }

  onItemChange(selectedAnswer: any, expectedAnswer: any) {
    this.selectedAnswer = selectedAnswer.key;
    this.expectedAnswer = expectedAnswer.respostaCorreta;
  }

  verifyAnswer(idQuestao, respostaCorreta): void {
    this.pauseTimer();
    if (this.answerList.length > 0) {
      for (let i = 0; i < this.answerList.length; i++) {
        const item = this.answerList[i];
        if (item.idQuestao === idQuestao) {
          this.answerList.splice(i, 1, {
            idQuestao: idQuestao,
            respostaCorreta: respostaCorreta,
            respostaRecebida: this.selectedAnswer,
            tempoDecorrido: this.time.toString()
          });
        } else {
          const found = this.answerList.find(
            (el) => el.idQuestao === idQuestao
          );
          if (!found) {
            this.answerList.push({
              idQuestao: idQuestao,
              respostaCorreta: respostaCorreta,
              respostaRecebida: this.selectedAnswer,
              tempoDecorrido: this.time.toString()
            });
          }
        }
      }
    } else {
      this.answerList.push({
        idQuestao: idQuestao,
        respostaCorreta: respostaCorreta,
        respostaRecebida: this.selectedAnswer,
        tempoDecorrido: this.time.toString()
      });
    }
    this.time = 0;
    this.nextQuestion++;
    this.startTimer();
  }

  pauseTimer(): void {
    this.play = false;
    clearInterval(this.interval);
  }

  sendAnswer(): void {
    var uid = '';
    var studentData: StudentsList;

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        uid = user.uid;
      }
    });

    this.studentsService
      .getStudentsList()
      .subscribe((students: StudentsList[]) => {
        students.forEach((element) => {
          if (element.uid === uid) {
            studentData = element;
          }
        });
        const data: Avaliation = {
          respostas: this.answerList,
          data: new Date(),
          qtdQuestoes: this.answerList.length,
          idProva: this.idTest,
          idAluno: studentData.idAluno,
          idTurma: studentData.idTurma,
          idDisciplina: 0,
          idProfessor: 0,
        };

        this.testService.postTest(data).subscribe(
          () => {},
          (error) => {
            console.log('error', error);
          }
        );
      });
  }
}
