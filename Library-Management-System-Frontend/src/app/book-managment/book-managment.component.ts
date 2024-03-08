import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {BookService} from "../services/book.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {AddBookComponent} from "../add-book/add-book.component";
import {ProfileStudentComponent} from "../profile-student/profile-student.component";
import {BookDetailsComponent} from "../book-details/book-details.component";
import {BookByAuthorComponent} from "../book-by-author/book-by-author.component";
import {Book} from "../models/book.model";

@Component({
  selector: 'app-book-managment',
  templateUrl: './book-managment.component.html',
  styleUrls: ['./book-managment.component.css']
})
export class BookManagmentComponent implements OnInit {
  ref?: DynamicDialogRef;
  books:any;
  currentBook: any = {};
  currentIndex=-1;
  title='';
  first = 0;

  rows = 5;
  count=0;
  constructor(private bookService:BookService,public dialogService: DialogService, public messageService: MessageService) { }

  ngOnInit(): void {
    this.refreshList();
  }
  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }
  retrieveBooks(): void {

    this.bookService.getAll()
      .subscribe(
          (response: any) => {
          this.books = response;
          console.log(this.books);
        },
          (error: any) => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveBooks();
    this.currentBook = {};
    this.currentIndex = -1;
  }
  removeAllBooks(){
    this.bookService.deleteAll().subscribe({
      next: (data:any) => {
        this.refreshList()
        console.log(data);
      },
      error: (e:any) => console.error(e)
    });
  }
  searchTitle() {
    this.bookService.findByTitle(this.title)
      .subscribe({
        next: (data:any) => {
          this.books = data;
          console.log(data);
        },
        error: (e:any) => console.error(e)
      });
  }
  deleteBook(book:any): void {
    this.bookService.delete(book.id)
      .subscribe({
        next: (res:any) => {
          console.log(res);
          this.refreshList();
        },
        error: (e:any) => console.error(e)
      });
    this.messageService.add({severity:'success', summary:'Success', detail:'Data Deleted'});

  }

  updatePublished(book: any, b: boolean) {

  }

  updateBook() {

  }
  show() {
    this.ref = this.dialogService.open(AddBookComponent, {
      header: 'Add Book',
      width: '75%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe(() =>{
      this.retrieveBooks();
    });
  }

  showHistory(book:Book) {
    this.ref = this.dialogService.open(BookDetailsComponent, {
      header: 'Details of' + book.title,
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      data: {
        bookId: book.id // Pass any additional data needed to fetch books by author
      }});
    this.ref.onClose.subscribe();
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }


  showAddBook() {
    this.ref = this.dialogService.open(AddBookComponent, {
      header: 'ADD BOOK',
      width: '70%',
      contentStyle: {"max-height": "80000px", "overflow": "auto"},
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe(next=>{
    this.retrieveBooks();
    });
  }
}

