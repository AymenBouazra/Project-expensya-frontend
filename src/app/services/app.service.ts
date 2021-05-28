import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl:string=environment.baseUrl
  constructor(private http:HttpClient) { }
  upload(file):Observable<any> {
  
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
  
    return this.http.post(`${this.baseUrl}/uploadFile`,formData)
  }
  
}
