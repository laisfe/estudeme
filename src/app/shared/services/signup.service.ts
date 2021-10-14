import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  StudentRegistration,
  TeacherRegistration,
} from '../models/registration';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}

  putNewStudent(data: StudentRegistration): Observable<StudentRegistration> {
    return this.http.post<StudentRegistration>(
      `${environment.SERVER_URL}/aluno`,
      data
    );
  }

  putNewTeacher(data: TeacherRegistration): Observable<TeacherRegistration> {
    return this.http.post<TeacherRegistration>(
      `${environment.SERVER_URL}/professor`,
      data
    );
  }
}
