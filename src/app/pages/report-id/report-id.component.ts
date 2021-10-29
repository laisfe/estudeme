import { Component, OnInit } from '@angular/core';
import { Avaliation } from 'src/app/shared/models/answers';
import { ReportService } from '../report/report.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GlobalVariable } from 'src/app/shared/globals';

@Component({
  selector: 'app-report-id',
  templateUrl: './report-id.component.html',
  styleUrls: ['./report-id.component.scss'],
})
export class ReportIdComponent implements OnInit {
  uid: string;
  loading: boolean = false;
  avaliationsList: Avaliation[] = [];

  constructor(
    private reportService: ReportService,
    public globalVariable: GlobalVariable
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.globalVariable.studentIdGlobal;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid;
        this.getReports();
      }
    });
  }

  getReports(): void {
    this.reportService
      .getAvaliations()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((avaliations: Avaliation[]) => {
        avaliations.forEach((element) => {
          if (element.idAluno === this.globalVariable.studentIdGlobal) {
            this.avaliationsList.push({
              idAvaliacao: element.idAvaliacao,
              respostas: element.respostas,
              data: element.data,
              qtdQuestoes: element.qtdQuestoes,
              idProva: element.idProva,
              idAluno: element.idAluno,
              idTurma: element.idTurma,
              idDisciplina: element.idDisciplina,
              idProfessor: element.idProfessor,
              uid: element.uid,
            });
          }
        });
      });
  }

  openReport(idAvaliacao: string): void {
    window.open(environment.REPORTS + '/' + idAvaliacao + '.pdf', '_blank');
  }
}
