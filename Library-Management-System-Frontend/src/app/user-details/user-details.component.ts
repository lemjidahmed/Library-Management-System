import { Component, OnInit } from '@angular/core';
import {BookService} from "../services/book.service";
import {BorrowService} from "../services/borrow.service";
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {Borrow} from "../models/borrow.model";
import {Book} from "../models/book.model";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  id?: number;
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
    this.id = this.config.data.userId; // Get author id from dialog data    // // console.log(this.id);
    // this.book = new Book();
    // this.bookService.getBookById(this.id).subscribe( data => {
    //   this.book = data;
    //   console.log(data);
    // })
    if (this.id!=null){
      this.getBorrowedByUser(this.id);
    }
  }

  private getBorrowedByUser(userId: number) {
    this.borrowService.getBooksBorrowedByUser(userId).subscribe((data:any) => {
      this.borrow = data;
      console.log(data);
    });
  }

}
