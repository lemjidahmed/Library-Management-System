import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../models/book.model";
const baseUrl = 'http://localhost:8080/api/books';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get<any>(baseUrl);
  }

  getAllByPage(params: any): Observable<any> {
    return this.http.get<any>(baseUrl, { params });
  }

  get(id:any): Observable<Book>{
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


  findByTitle(title: string):Observable<any> {
    return this.http.get<any>(`${baseUrl}?title=${title}`);
  }

  getTutorialsLarge(page:number,size:number) {
    return this.http.get<any>(`${baseUrl}/page?page=${page}&size=${size}`)
  }
}

