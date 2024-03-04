import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const BASE_URL = 'http://localhost:8080/api/password/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private http:HttpClient) { }

  verifyEmail(email:string){
    return this.http.post(
      BASE_URL + 'forget_password',
      {
        email
      },
      httpOptions
    );
  }

  resetPassword(user:any,password:string)
  {
    return this.http.post(
      BASE_URL + 'reset_password',
      {
        user,password
      },
      httpOptions
    );
  }
}
