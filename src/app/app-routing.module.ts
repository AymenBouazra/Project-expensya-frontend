import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FieldMappingComponent } from './field-mapping/field-mapping.component';
import { Page404Component } from './page404/page404.component';
import { UploadFileComponent } from './upload-file/upload-file.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/upload-file',
    pathMatch:'full'
  },
  {
    path : 'upload-file',
    component : UploadFileComponent
  },{
    path : 'field-mapping',
    component : FieldMappingComponent
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
