import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { QuestionsList } from 'src/app/shared/models/questions';
import { TeachersList } from 'src/app/shared/models/teachers';
import { TeacherService } from 'src/app/shared/services/teacher.service';
import { NewActivityService } from './new-activity.service';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.scss'],
})
export class NewActivityComponent implements OnInit {
  loading: boolean = false;
  public data = {};
  public formDataList = [];
  questionsList: QuestionsList[];
  savedQuestionsList: QuestionsList[] = [];

  constructor(
    public newActivityService: NewActivityService,
    public teacherService: TeacherService,
    private angularFireAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions(): void {
    this.newActivityService.getQuestionsList().subscribe(
      (questions: QuestionsList[]) => {
        this.questionsList = questions;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  async sendQuestions(): Promise<void> {
    console.log('this.savedQuestionsList', this.savedQuestionsList);
    const uidUser = (await this.angularFireAuth.currentUser).uid;
    this.teacherService.getTeachersList().subscribe(
      (teachers: TeachersList[]) => {
        teachers.forEach((element) => {
          if (element.uid === uidUser) {
            const idProfessor = element.idProfessor;
          }
        });
      },
      (error) => {
        console.log('error', error);
      }
    );
    console.log(uidUser);
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

  // addMore(): void {
  //   var contents = jQuery('form').html();
  //   jQuery('#wrapper').append(contents);
  // }

  addItem($item) {
    this.formDataList.push($item);
    this.data = {};
  }

  removeItem($item) {
    this.formDataList.splice(this.formDataList.indexOf($item), 1);
  }
}
