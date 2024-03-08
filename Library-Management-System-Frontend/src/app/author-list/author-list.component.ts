import { Component, OnInit } from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {AddAuthorComponent} from "../add-author/add-author.component";
import {AuthorService} from "../services/author.service";
import {BookByAuthorComponent} from "../book-by-author/book-by-author.component";
@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  authors:any;
  currentAuthor: any = {};
  currentIndex=-1;
  name='';
  first = 0;
  rows = 5;
  count=0;
  constructor(private authorService:AuthorService,public dialogService: DialogService, public messageService: MessageService) { }

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
  retrieveAuthors(): void {

    this.authorService.getAll()
      .subscribe(
        (response: any) => {
          this.authors = response;
          console.log(this.authors);
        },
        (error: any) => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveAuthors();
    this.currentAuthor = {};
    this.currentIndex = -1;
  }
  removeAllAuthors(){
    this.authorService.deleteAll().subscribe({
      next: (data:any) => {
        this.refreshList()
        console.log(data);
      },
      error: (e:any) => console.error(e)
    });
  }
  searchTitle() {
    this.authorService.findByName(this.name)
      .subscribe({
        next: (data:any) => {
          this.authors = data;
          console.log(data);
        },
        error: (e:any) => console.error(e)
      });
  }
  deleteAuthor(author:any): void {
    this.authorService.delete(author.id)
      .subscribe({
        next: (res:any) => {
          console.log(res);
          this.refreshList();
        },
        error: (e:any) => console.error(e)
      });
    this.messageService.add({severity:'success', summary:'Success', detail:'Data Deleted'});

  }

  updatePublished(author: any, b: boolean) {

  }

  updateAuthor() {

  }

  ref?: DynamicDialogRef;

  // show() {
  //   this.ref = this.dialogService.open(AddauthorComponent, {
  //     header: 'Add author',
  //     width: '75%',
  //     contentStyle: {"max-height": "500px", "overflow": "auto"},
  //     baseZIndex: 10000
  //   });
  //   this.ref.onClose.subscribe(() =>{
  //     this.retrieveAuthors();
  //   });
  // }
  //
  // show1() {
  //   this.ref = this.dialogService.open(ProfileStudentComponent, {
  //     header: 'Add author',
  //     width: '75%',
  //     contentStyle: {"max-height": "500px", "overflow": "auto"},
  //     baseZIndex: 10000
  //   });
  //   this.ref.onClose.subscribe(() =>{
  //     this.retrieveAuthors();
  //   });
  // }
  //
  // ngOnDestroy() {
  //   if (this.ref) {
  //     this.ref.close();
  //   }
  // }

  showBooks(author:any) {
      this.ref = this.dialogService.open(BookByAuthorComponent, {
        header: 'Books by ' + author.name,
        width: '30%',
        contentStyle: { "max-height": "500px", "overflow": "auto" },
        baseZIndex: 10000,
        data: {
          authorId: author.id // Pass any additional data needed to fetch books by author
      }});
      this.ref.onClose.subscribe();
  }

  }

