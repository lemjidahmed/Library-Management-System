import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../models/book.model";
const baseUrl = 'http://localhost:8080/api/authors';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http:HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get<any>(baseUrl);
  }

  getAllByPage(params: any): Observable<any> {
    return this.http.get<any>(baseUrl, { params });
  }

  getBookById(id:any): Observable<Book>{
    return this.http.get<Book>(`${baseUrl}/${id}`);

  }

  create(data:any): Observable<any>{
    return this.http.post(baseUrl,data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  deleteAll():Observable<any>{
    return this.http.delete(baseUrl);
  }

  delete(id:any):Observable<any>{
    return this.http.delete(`${baseUrl}/${id}`);
  }


  findByName(name: string) {
    return this.http.get<any>(`${baseUrl}?title=${name}`);
  }
}
