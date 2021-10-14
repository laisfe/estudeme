import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TeachersList } from '../models/teachers';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  getTeachersList(): Observable<TeachersList[]> {
    return this.http.get<TeachersList[]>(`${environment.SERVER_URL}/professor`);
  }

  putTeacher(data: TeachersList, id: number): Observable<TeachersList> {
    return this.http.put<TeachersList>(
      `${environment.SERVER_URL}/professor/${id}`,
      data
    );
  }
}
