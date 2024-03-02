import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import { HttpClientModule } from '@angular/common/http';
import {ToastModule} from "primeng/toast";
import { MessageService } from 'primeng/api';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import {SidebarModule} from "primeng/sidebar";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MenubarModule} from "primeng/menubar";
import { BookManagmentComponent } from './book-managment/book-managment.component';
import {TableModule} from "primeng/table";
import {httpInterceptorProviders} from "./_helpers/http.interceptor";



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    SidenavComponent,
    BookManagmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    SidebarModule,
    BrowserAnimationsModule,
    MenubarModule,
    TableModule
  ],
  providers: [MessageService,
    httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
