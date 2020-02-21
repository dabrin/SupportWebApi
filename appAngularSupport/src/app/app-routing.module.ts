import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/components/Issue/list/list.component';
import { IssueCreateComponent } from './components/components/Issue/create/create.component';
import { SupportComponent } from './components/components/support/support.component';
import { DetailsComponent } from './components/components/Issue/details/details.component';

const routes: Routes = [

  { path: '', redirectTo: 'Issue', pathMatch: 'full' },
  { path: 'Issue', component: ListComponent },
  { path: 'Create', component: IssueCreateComponent },
  { path: 'support', component: SupportComponent },
  { path: 'details/:id', component: DetailsComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
