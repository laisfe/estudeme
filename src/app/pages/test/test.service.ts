import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuestionsList } from './models/questions';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  getQuestionsList(): Observable<QuestionsList[]> {
    return this.http.get<QuestionsList[]>(`${environment.SERVER_URL}/questao`);
  }
}
