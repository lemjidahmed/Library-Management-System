import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { AddBookComponent } from './add-book/add-book.component';
import {DialogService} from "primeng/dynamicdialog";
import {CaptchaModule} from "primeng/captcha";
import { BookListComponent } from './book-list/book-list.component';
import {DataViewModule} from "primeng/dataview";
import {DropdownModule} from "primeng/dropdown";
import {RatingModule} from "primeng/rating";
import {FileUploadModule} from "primeng/fileupload";
import {RippleModule} from "primeng/ripple";
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { BorrowBookComponent } from './borrow-book/borrow-book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { BookByAuthorComponent } from './book-by-author/book-by-author.component';
import {ListboxModule} from "primeng/listbox";
import { ReturnBookComponent } from './return-book/return-book.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import {CascadeSelectModule} from "primeng/cascadeselect";
import {InputNumberModule} from "primeng/inputnumber";



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    SidenavComponent,
    BookManagmentComponent,
    ForgetPasswordComponent,
    StudentsListComponent,
    AddBookComponent,
    BookListComponent,
    ProfileStudentComponent,
    BorrowBookComponent,
    BookDetailsComponent,
    AddAuthorComponent,
    AuthorListComponent,
    BookByAuthorComponent,
    ReturnBookComponent,
    UserDetailsComponent
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
    TableModule,
    CaptchaModule,
    DataViewModule,
    DropdownModule,
    RatingModule,
    FormsModule,
    FileUploadModule,
    RippleModule,
    ListboxModule,
    CascadeSelectModule,
    InputNumberModule
  ],
  providers: [MessageService,
    httpInterceptorProviders,
    DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
