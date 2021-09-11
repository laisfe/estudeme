import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  constructor(private http: HttpClient) {}

  upload(files: Set<File>, url: string) {
    const formData = new FormData();
    files.forEach((file) => formData.append('file', file, file.name));
    const request = new HttpRequest('POST', url, formData);
    return this.http.request(request);
  }

  select(url: string) {
    const formData = new FormData();
    const request = new HttpRequest('GET', url, formData);
    return this.http.request(request);
  }
}
