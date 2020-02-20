import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/components/Issue/list/list.component';
import { IssueCreateComponent } from './components/components/Issue/create/create.component';
import { SupportComponent } from './components/components/support/support.component';


const routes: Routes = [

  { path: '', redirectTo: 'Issue', pathMatch: 'full' },
  { path: 'Issue', component: ListComponent },
  { path: 'Create', component: IssueCreateComponent },
  { path: 'support', component: SupportComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
