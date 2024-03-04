import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import { AuthGuard } from './guards/auth.guard';
import {BookManagmentComponent} from "./book-managment/book-managment.component";
import {ForgetPasswordComponent} from "./forget-password/forget-password.component";
import {StudentsListComponent} from "./students-list/students-list.component";
import {BookListComponent} from "./book-list/book-list.component";

const routes: Routes = [
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'forgetpass',component: ForgetPasswordComponent},

  // {
  //   path: 'gestion-books',
  //   component: BookManagmentComponent,
  // },
  {path: 'home',component: DashboardComponent,
    children: [
      {path: 'gestion-books', component: BookManagmentComponent},
      {path: 'student-list', component: StudentsListComponent},
      {path: 'book-list', component: BookListComponent}

    ],
    canActivate: [AuthGuard]
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
