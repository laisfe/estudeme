import { Component, OnInit } from '@angular/core';
import { AnswersList, Avaliation } from './models/answers';
import { AlternativesList, Test } from '../../shared/models/questions';
import { TestService } from './test.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import { StudentsService } from 'src/app/shared/services/students.service';
import { StudentsList } from 'src/app/shared/models/students-types';
import { AngularFireAuth } from '@angular/fire/auth';

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
  didInitialTest: boolean;
  uid: string;

  constructor(
    private testService: TestService,
    private studentsService: StudentsService,
    private angularFireAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.angularFireAuth.authState.subscribe(
      (user) => {
        this.uid = user.uid;
        this.getQuestionsList();
      },
      (error) => {
        console.log('error', error);
      }
    );
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
    this.studentsService.getStudentsList().subscribe(
      (students: StudentsList[]) => {
        students.every((element) => {
          if (element.uid === this.uid) {
            this.didInitialTest = element.fezProvaInicial;
            return false;
          }
          return true;
        });
        if (!this.didInitialTest) {
          const idInitialTest = '6141ffe2631c5ecb56737721';
          this.testService.getTestById(idInitialTest).subscribe(
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
        } else {
          this.testService.getTests().subscribe(
            (tests: Test[]) => {
              const id = tests.length - 1
              this.questionsList = tests[id].questoes;
              this.idTest = tests[id].idProva;
              this.loading = false;
              this.startTimer();
            },
            (error) => {
              console.log('error', error);
              this.loading = false;
            }
          );
        }
      },
      (error) => {
        console.log('error', error);
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
            tempoDecorrido: this.time.toString(),
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
              tempoDecorrido: this.time.toString(),
            });
          }
        }
      }
    } else {
      this.answerList.push({
        idQuestao: idQuestao,
        respostaCorreta: respostaCorreta,
        respostaRecebida: this.selectedAnswer,
        tempoDecorrido: this.time.toString(),
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

    this.studentsService.getStudentsList().subscribe(
      (students: StudentsList[]) => {
        students.every((element) => {
          if (element.uid === uid) {
            studentData = element;
            return false;
          }
          return true;
        });
        const dataAvaliation: Avaliation = {
          respostas: this.answerList,
          data: new Date(),
          qtdQuestoes: this.answerList.length,
          idProva: this.idTest,
          idAluno: studentData.idAluno,
          idTurma: studentData.idTurma,
          idDisciplina: 0,
          idProfessor: 0,
        };

        this.testService.postTest(dataAvaliation).subscribe(
          () => {},
          (error) => {
            console.log('error', error);
          }
        );

        if (!this.didInitialTest) {
          const dataStudents: StudentsList = {
            idAluno: studentData.idAluno,
            nome: studentData.nome,
            ano: studentData.ano,
            nascimento: studentData.nascimento,
            idIns: studentData.idIns,
            idTurma: studentData.idTurma,
            email: studentData.email,
            uid: studentData.uid,
            fezProvaInicial: true,
          };

          this.studentsService.putStudentsList(dataStudents, dataStudents.idAluno).subscribe(
            () => {
              window.location.reload();
            },
            (error) => {
              console.log('error', error);
            }
          );
        } else {
          window.location.reload();
        }
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
