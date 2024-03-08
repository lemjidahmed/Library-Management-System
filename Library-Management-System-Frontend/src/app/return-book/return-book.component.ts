import { Component, OnInit } from '@angular/core';
import {Borrow} from "../models/borrow.model";
import {BorrowService} from "../services/borrow.service";
import {BookService} from "../services/book.service";
import {StorageService} from "../services/storage.service";
import {Book} from "../models/book.model";

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.css']
})
export class ReturnBookComponent implements OnInit {
  books?: Book[];
  borrow: any;

  constructor(
    private borrowService: BorrowService,
    private booksService: BookService,
    private storageService:StorageService
  ) { }

  userId = this.storageService.getUser().id;

  ngOnInit(): void {
    this.getBooks();
    this.getBooksByUser();
  }

  private getBooks() {
    this.booksService.getAll().subscribe(data =>{
      this.books = data;
    });
  }


  private getBooksByUser() {
    this.borrowService.getBooksBorrowedByUser(this.userId).subscribe(data => {
      this.borrow = data;
    })
  }

  brw: Borrow = new Borrow();
  public returnBook(borrowId: number) {
    this.brw.borrowId = borrowId;
    this.borrowService.returnBook(this.brw).subscribe(data => {
        console.log(data);
        this.getBooksByUser();
      },
      error => console.log(error));
  }

}
