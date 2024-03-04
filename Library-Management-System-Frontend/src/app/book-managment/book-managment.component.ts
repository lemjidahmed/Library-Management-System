import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {BookService} from "../services/book.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {AddBookComponent} from "../add-book/add-book.component";

@Component({
  selector: 'app-book-managment',
  templateUrl: './book-managment.component.html',
  styleUrls: ['./book-managment.component.css']
})
export class BookManagmentComponent implements OnInit {
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
  deleteBook(tuto:any): void {
    this.bookService.delete(tuto.id)
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

  ref?: DynamicDialogRef;

  show() {
    this.ref = this.dialogService.open(AddBookComponent, {
      header: 'Add Book',
      width: '25%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe(() =>{
      this.retrieveBooks();
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

}

