import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { QuestionsList, Test } from 'src/app/shared/models/questions';
import { StudentsList } from 'src/app/shared/models/students-types';
import { TeachersList } from 'src/app/shared/models/teachers';
import { StudentsService } from 'src/app/shared/services/students.service';
import { TeacherService } from 'src/app/shared/services/teacher.service';
import { NewActivityService } from './new-activity.service';
import { finalize } from 'rxjs/operators';
import firebase from 'firebase/app';
import 'firebase/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.scss'],
})
export class NewActivityComponent implements OnInit {
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  loading: boolean = false;
  public data = {};
  public formDataList = [];
  questionsList: QuestionsList[];
  savedQuestionsList: QuestionsList[] = [];
  savedStudentsList: { idAluno: number; idTurma: number }[] = [];
  studentsList: StudentsList[] = [];
  uidUser: string;
  check: boolean = false;

  constructor(
    public newActivityService: NewActivityService,
    public teacherService: TeacherService,
    private studentsService: StudentsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.uidUser = user.uid;
      }
    });

    this.getQuestions();
    this.getStudents();
  }

  getQuestions(): void {
    this.loading = true;
    this.newActivityService.getQuestionsList().subscribe(
      (questions: QuestionsList[]) => {
        this.questionsList = questions;
        this.loading = false;
      },
      (error) => {
        console.log('error', error);
        this.loading = false;
      }
    );
  }

  getStudents(): void {
    this.studentsService.getStudentsList().subscribe(
      (students: StudentsList[]) => {
        this.studentsList = students;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  checkCheckBoxvalue(questions): void {
    if (this.savedQuestionsList.length > 0) {
      for (let i = 0; i < this.savedQuestionsList.length; i++) {
        const item = this.savedQuestionsList[i];
        if (item.idQuestao === questions.idQuestao) {
          this.savedQuestionsList.splice(i, 1);
          break;
        } else {
          const found = this.savedQuestionsList.find(
            (el) => el.idQuestao === questions.idQuestao
          );
          if (!found) {
            this.savedQuestionsList.push({
              idQuestao: questions.idQuestao,
              enunciado: questions.enunciado,
              ano: questions.ano,
              respostaCorreta: questions.respostaCorreta,
              fonte: questions.fonte,
              urlImagem: questions.urlImagem,
              alternativas: questions.alternativas,
              idDisciplina: questions.idDisciplina,
              idCompetencia: questions.idCompetencia,
              idHabilidade: questions.idHabilidade,
            });
            break;
          } else if (item.idQuestao === questions.idQuestao) {
            this.savedQuestionsList.splice(i, 1);
            break;
          }
        }
      }
    } else {
      this.savedQuestionsList.push({
        idQuestao: questions.idQuestao,
        enunciado: questions.enunciado,
        ano: questions.ano,
        respostaCorreta: questions.respostaCorreta,
        fonte: questions.fonte,
        urlImagem: questions.urlImagem,
        alternativas: questions.alternativas,
        idDisciplina: questions.idDisciplina,
        idCompetencia: questions.idCompetencia,
        idHabilidade: questions.idHabilidade,
      });
    }
  }

  checkCheckBoxStudentsValue(students: StudentsList): void {
    if (this.savedStudentsList.length > 0) {
      for (let i = 0; i < this.savedStudentsList.length; i++) {
        const item = this.savedStudentsList[i];
        if (item.idAluno === students.idAluno) {
          this.savedStudentsList.splice(i, 1);
          break;
        } else {
          const found = this.savedStudentsList.find(
            (el) => el.idAluno === students.idAluno
          );
          if (!found) {
            this.savedStudentsList.push({
              idAluno: students.idAluno,
              idTurma: students.idTurma,
            });
            break;
          } else if (item.idAluno === students.idAluno) {
            this.savedQuestionsList.splice(i, 1);
            break;
          }
        }
      }
    } else {
      this.savedStudentsList.push({
        idAluno: students.idAluno,
        idTurma: students.idTurma,
      });
    }
  }

  sendQuestions(): void {
    var idProfessor;
    var dataTest: Test;

    this.teacherService
      .getTeachersList()
      .pipe(
        finalize(() => {
          this.savedStudentsList.forEach((element) => {
            dataTest = {
              idProfessor: idProfessor,
              questoes: this.savedQuestionsList,
              idAluno: element.idAluno,
              idTurma: element.idTurma,
            };
            this.newActivityService.postTest(dataTest).subscribe(
              () => {
                this.toastr.success(
                  'Nova atividade criada com sucesso!',
                  'Dados salvos!'
                );
                this.uncheck();
              },
              (error) => {
                console.log('error', error);
              }
            );
          });
        })
      )
      .subscribe(
        (teachers: TeachersList[]) => {
          teachers.every((element) => {
            if (element.uid === this.uidUser) {
              idProfessor = element.idProfessor;
              return false;
            }
            return true;
          });
        },
        (error) => {
          console.log('error', error);
        }
      );
  }

  uncheck(): void {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
  }
}
