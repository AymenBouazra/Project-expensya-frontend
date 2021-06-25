import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn() : Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }
  baseUrl: string = environment.baseUrl;
  constructor(private http:HttpClient) { }

  SignIn(data:any){
    this.isLoginSubject.next(true);
    return this.http.post(`${this.baseUrl}/login`,data)
  }
  logout(){
    this.isLoginSubject.next(false);
    return this.http.get(`${this.baseUrl}/logout`)
  }
  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
