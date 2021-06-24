import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }
  upload(file): Observable<any> {
    // start spinner
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.baseUrl}/uploadFile`, formData);
  }

  import(header: any, filename: any) {
    return this.http.post(`${this.baseUrl}/startImport/${filename}`, header);
  }

  getAllHeaders(){
    return this.http.get(`${this.baseUrl}/getHeaders`);
  }

  updateMatching(id:any, data:any): Observable<any>{
    return this.http.put(`${this.baseUrl}/matchingStrings/${id}`,data);
  }
 
}
