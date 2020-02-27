import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ListComponent } from './components/components/Issue/list/list.component';


import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SupportComponent } from './components/components/support/support.component';
import { DetailsComponent } from './components/components/Issue/details/details.component';
import { LoginComponent } from './components/components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent, SupportComponent, DetailsComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
