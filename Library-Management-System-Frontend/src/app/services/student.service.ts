import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
const baseUrl = 'http://localhost:8080/api/students';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get<any>(baseUrl);
  }

  deleteAll():Observable<any>{
    return this.http.delete(baseUrl);
  }

  delete(id:any):Observable<any>{
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
