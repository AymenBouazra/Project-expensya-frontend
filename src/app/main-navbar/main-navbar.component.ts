import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent implements OnInit
 {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
isLoggedIn : Observable<boolean>;
  constructor(private breakpointObserver: BreakpointObserver,private loginService:LoginService, private router:Router) {this.isLoggedIn = loginService.isLoggedIn();}
  
    


  ngOnInit(): void {}
  
  logout() {
    this.loginService.logout().subscribe((response: any) => {
      this.loginService.changeLoginBehavior(false)
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
    })
  }

}
