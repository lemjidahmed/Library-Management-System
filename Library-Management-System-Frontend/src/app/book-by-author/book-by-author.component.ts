import { Component, OnInit } from '@angular/core';
import {BookService} from "../services/book.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Book} from "../models/book.model";

@Component({
  selector: 'app-book-by-author',
  templateUrl: './book-by-author.component.html',
  styleUrls: ['./book-by-author.component.css']
})
export class BookByAuthorComponent implements OnInit {
  books:any;
  selectedBook: any;
  constructor(private bookService: BookService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    const authorId = this.config.data.authorId; // Get author id from dialog data
    this.bookService.getBooksByAuthor(authorId).subscribe(books => this.books = books);
  }

}
