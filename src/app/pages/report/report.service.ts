import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Avaliation } from 'src/app/shared/models/answers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getAvaliations(): Observable<Avaliation[]> {
    return this.http.get<Avaliation[]>(`${environment.SERVER_URL}/avaliacao`);
  }
}
