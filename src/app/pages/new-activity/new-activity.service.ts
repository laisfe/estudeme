import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuestionsList, Test } from 'src/app/shared/models/questions';

@Injectable({
  providedIn: 'root',
})
export class NewActivityService {
  constructor(private http: HttpClient) {}

  getQuestionsList(): Observable<QuestionsList[]> {
    return this.http.get<QuestionsList[]>(`${environment.SERVER_URL}/questao`);
  }

  postTest(data: Test): Observable<Test> {
    return this.http.post<Test>(
      `${environment.SERVER_URL}/prova`,
      data
    );
  }

}
