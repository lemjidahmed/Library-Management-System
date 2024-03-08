import { Component, OnInit } from '@angular/core';
import {Borrow} from "../models/borrow.model";
import {BorrowService} from "../services/borrow.service";
import {BookService} from "../services/book.service";
import {Book} from "../models/book.model";
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-borrow-book',
  templateUrl: './borrow-book.component.html',
  styleUrls: ['./borrow-book.component.css']
})
export class BorrowBookComponent implements OnInit {

  books: Book[]=[];

  constructor(
    private booksService: BookService,
    private storageService: StorageService,
    private borrowService: BorrowService,
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }
  private getBooks() {
    this.booksService.getAll().subscribe(data =>{
      this.books = data;
    });
  }

  borrow: Borrow = new Borrow();

  borrowBook(bookId: number) {
    if (bookId !== undefined){
      this.borrow.bookId = bookId;
      this.borrow.userId = this.storageService.getUser().id;
      console.log(this.borrow);
      this.borrowService.borrowBook(this.borrow).subscribe(data => {
          console.log(data);
        },
        error => console.log(error));
    }
    }
}
