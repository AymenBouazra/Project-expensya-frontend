import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HeadersComponent } from './headers/headers.component';
import { MatchingHeaderComponent } from './matching-header/matching-header.component';
import { Page404Component } from './page404/page404.component';
const routes: Routes = [
  {
    path: '',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path: 'matching-header',
    component:MatchingHeaderComponent
  },
  {
    path: 'login',
    component:AuthComponent
  },
  {
    path: 'headers',
    component:HeadersComponent
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'matching-header', loadChildren: () => import('./matching-header/matching-header.module').then(m => m.MatchingHeaderModule) },
  {
    path : '**',
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
