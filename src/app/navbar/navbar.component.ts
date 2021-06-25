import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../auth/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn : Observable<boolean>;
  // showButton=false
  constructor(private loginService:LoginService, private router:Router) {
    this.isLoggedIn = loginService.isLoggedIn();
}

  ngOnInit(): void {
    // let token = localStorage.getItem('token')
  // if(token==null){
    // this.showButton=true
    // this.router.navigate(['/login'])
  // } 
  }
  logout() {
    this.loginService.logout().subscribe((response: any) => {
      localStorage.removeItem('token')
      window.location.reload();
    })
  }
}
