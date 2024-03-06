import {Component, OnInit, ViewChild} from '@angular/core';
import {PrimeNGConfig, SelectItem} from "primeng/api";
import {BookService} from "../services/book.service";
import {Table} from "primeng/table";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  protected readonly HTMLInputElement = HTMLInputElement;
  books: any=[];
  sortOptions: SelectItem[] = [];
  sortOrder: number = 1; // Initialize to default value
  sortField: string = ''; // Initialize to empty string
  sortKey: any;
  @ViewChild('dt') dt: Table | undefined;
  title?: string;


  constructor(private bookService: BookService,private primengConfig: PrimeNGConfig,public domSanitizer: DomSanitizer) { }

  ngOnInit() {
      this.retrieveBooks();
    this.sortOptions = [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'}
    ];

    this.primengConfig.ripple = true;
  }
  retrieveBooks() {
    this.bookService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        data.forEach((element: any) => {
          // Convert image byte array to Base64 data URL
          const imageUrl = 'data:image/jpeg;base64,' + element.image;
          const safeImageUrl: SafeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
            'data:image/png;base64,' + element.image);


          // Push modified element to books array
          this.books.push({ ...element, image: safeImageUrl });
        });
      }
    });
  }


  onSortChange(value:string) {

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  searchTitle() {
    this.books.findByTitle(this.title)
      .subscribe({
        next: (data:any) => {
          this.books = data;
          console.log(data);
        },
        error: (e:any) => console.error(e)
      });
  }




}
