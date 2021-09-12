import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  constructor(private http: HttpClient) { }

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

  download(url: string) {
    return this.http.get(url, {
      responseType: 'blob' as 'json'
    });
  }

  handleFile(response: any, fileName: string) {
    const file = new Blob([response], {
      type: response.type
    });

    //IE
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file);
      return;
    }

    //Chrome
    const blob = window.URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = blob;
    link.download = fileName

    link.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }))

    setTimeout(() => { //Firefox
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100);

  }

}
