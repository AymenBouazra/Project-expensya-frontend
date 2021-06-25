import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string = environment.baseUrl;
  constructor(private http:HttpClient) { }

  SignIn(data:any){
    return this.http.post(`${this.baseUrl}/login`,data)
  }
  logout(){
    return this.http.get(`${this.baseUrl}/logout`)
   }
}
