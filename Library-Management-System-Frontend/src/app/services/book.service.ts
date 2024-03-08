import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../models/book.model";
const baseUrl = 'http://localhost:8080/api/books';
const baseUrl1 = 'http://localhost:8080/api/authors';

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


  findByTitle(title: string):Observable<any> {
    return this.http.get<any>(`${baseUrl}?title=${title}`);
  }

  getTutorialsLarge(page:number,size:number) {
    return this.http.get<any>(`${baseUrl}/page?page=${page}&size=${size}`)
  }

  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req= new HttpRequest('POST', `${baseUrl1}/upload`, formData, {
      // reportProgress: true,
      // responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${baseUrl1}/files`);
  }

  getBooksByAuthor(authorId: any):Observable<any> {
    return this.http.get<Book>(`${baseUrl}/book-author/${authorId}`);
  }
}

