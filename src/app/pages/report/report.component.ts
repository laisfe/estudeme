import { Component, OnInit } from '@angular/core';
import { ReportService } from './report.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import { finalize } from 'rxjs/operators';
import { Avaliation } from 'src/app/shared/models/answers';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  uid: string;
  loading: boolean = false;
  avaliationsList: Avaliation[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loading = true;
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
          if (element.uid === this.uid) {
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
