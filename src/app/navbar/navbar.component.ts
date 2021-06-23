import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../auth/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showButton=false
  constructor(private loginService:LoginService, private router:Router) {
     let token = localStorage.getItem('token')
  if(token==null){
    this.showButton=true
    router.navigate(['/login'])
  } 
}

  ngOnInit(): void {
    
  }
  logout() {
    this.loginService.logout().subscribe((response: any) => {
      localStorage.removeItem('token')
      window.location.reload();
    })
  }
}
