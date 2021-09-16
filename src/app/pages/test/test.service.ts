import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Test } from './models/questions';
import { Avaliation } from './models/answers';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  getTest(id: string): Observable<Test> {
    return this.http.get<Test>(`${environment.SERVER_URL}/prova/${id}`);
  }

  postTest(data: Avaliation): Observable<Avaliation> {
    return this.http.post<Avaliation>(
      `${environment.SERVER_URL}/avaliacao`,
      data
    );
  }
}
