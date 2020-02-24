import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/components/Issue/list/list.component';
import { IssueCreateComponent } from './components/components/Issue/create/create.component';
import { SupportComponent } from './components/components/support/support.component';
import { DetailsComponent } from './components/components/Issue/details/details.component';
import { LoginComponent } from './components/components/login/login.component';



const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'Issue', component: ListComponent },
  { path: 'Create', component: IssueCreateComponent },
  { path: 'support', component: SupportComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
