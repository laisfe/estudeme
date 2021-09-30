import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentsList } from '../models/students-types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  getStudentsList(): Observable<StudentsList[]> {
    return this.http.get<StudentsList[]>(`${environment.SERVER_URL}/aluno`);
  }

  putStudentsList(data: StudentsList, id: number): Observable<StudentsList> {
    return this.http.put<StudentsList>(
      `${environment.SERVER_URL}/aluno/${id}`,
      data
    );
  }
}
