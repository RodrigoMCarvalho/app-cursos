import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  AppRoutingModule,
  HttpClientModule,
  ModalModule.forRoot(),
  SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
