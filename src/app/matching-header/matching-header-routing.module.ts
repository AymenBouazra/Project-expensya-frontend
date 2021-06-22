import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchingHeaderComponent } from './matching-header.component';

const routes: Routes = [{ path: '', component: MatchingHeaderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchingHeaderRoutingModule { }
