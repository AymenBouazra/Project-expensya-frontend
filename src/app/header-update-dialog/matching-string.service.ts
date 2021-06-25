import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MatchingStringService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }
  
  getMatchingString(id:any){
    return this.http.get(`${this.baseUrl}/getHeaders/${id}`)
  }
}
