import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClassesList } from './models/classes';
import { SchoolsList } from './models/schools';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}

  getClassList(): Observable<ClassesList[]> {
    return this.http.get<ClassesList[]>(`${environment.SERVER_URL}/turma`);
  }

  getSchoolsList(): Observable<SchoolsList[]> {
    return this.http.get<SchoolsList[]>(`${environment.SERVER_URL}/instituicao`);
  }

  getSubjectList(): Observable<SchoolsList[]> {
    return this.http.get<SchoolsList[]>(`${environment.SERVER_URL}/disciplina`);
  }
}
