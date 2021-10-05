import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AnswersList, Avaliation } from './models/answers';
import { AlternativesList, Test } from '../../shared/models/questions';
import { TestService } from './test.service';
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
  didInitialTest: boolean;
  uid: string;
  idStudent: number;

  constructor(
    private testService: TestService,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid;
        this.getQuestionsList();
      }
    });
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
    const idInitialTest = '61564aea630c7fbfc7c96814';
    this.studentsService.getStudentsList().subscribe(
      (students: StudentsList[]) => {
        students.every((element) => {
          if (element.uid === this.uid) {
            this.didInitialTest = element.fezProvaInicial;
            this.idStudent = element.idAluno;
            return false;
          }
          return true;
        });
        if (!this.didInitialTest) {
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
              for (let i = tests.length; i > 0; i--) {
                if (tests[i - 1].idProva !== idInitialTest) {
                  if (tests[i - 1].idAluno === this.idStudent) {
                    this.questionsList = tests[i - 1].questoes;
                    this.idTest = tests[i - 1].idProva;
                    this.loading = false;
                    this.startTimer();
                  }
                } else {
                  this.loading = false;
                }
              }
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

          this.studentsService
            .putStudentsList(dataStudents, dataStudents.idAluno)
            .subscribe(
              () => {},
              (error) => {
                console.log('error', error);
              }
            );
        }
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
