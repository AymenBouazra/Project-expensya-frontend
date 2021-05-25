import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { Page404Component } from './page404/page404.component';
const routes: Routes = [
  {
    path: '',
    redirectTo:'/base',
    pathMatch:'full'
  },
  {
    path : 'base',
    component : BaseComponent
  },
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
