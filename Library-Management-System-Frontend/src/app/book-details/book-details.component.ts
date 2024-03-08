import { Component, OnInit } from '@angular/core';
import {Borrow} from "../models/borrow.model";
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../services/book.service";
import {BorrowService} from "../services/borrow.service";
import {StudentService} from "../services/student.service";
import {Book} from "../models/book.model";
import {UserService} from "../services/user.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  id?: any;
  book?: Book;
  borrow?: Borrow[];
  user: any;

  constructor(private route: ActivatedRoute,
              private bookService: BookService,
              private borrowService: BorrowService,
              public userService: UserService,
              public ref: DynamicDialogRef, public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.id = this.config.data.bookId; // Get author id from dialog data    // // console.log(this.id);
    // this.book = new Book();
    // this.bookService.getBookById(this.id).subscribe( data => {
    //   this.book = data;
    //   console.log(data);
    // })
    if(this.id!=null){
      this.getBorrowHistory(this.id);
    }
  }

  private getBorrowHistory(bookId: any) {
    this.borrowService.getBookBorrowHistory(bookId).subscribe(data => {
      this.borrow = data;
      console.log(data);
    });
  }

  // public getUserData(userId: number):string {
  //   this.userService.getUserById(userId).subscribe( (data:any) => {
  //     this.user = data;
  //   })
  //   return this.user.name;
  // }
}
