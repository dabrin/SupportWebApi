import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/components/Issue/list/list.component';
import { SupportComponent } from './components/components/support/support.component';

const routes: Routes = [

 // { path: '', redirectTo: 'Issue', pathMatch: 'full' },
  { path: 'issue', component: ListComponent },
  { path: 'support', component: SupportComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
