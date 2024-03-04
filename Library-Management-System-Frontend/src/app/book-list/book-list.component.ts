import {Component, OnInit, ViewChild} from '@angular/core';
import {PrimeNGConfig, SelectItem} from "primeng/api";
import {BookService} from "../services/book.service";
import {Table} from "primeng/table";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  protected readonly HTMLInputElement = HTMLInputElement;
  books: any;
  sortOptions: SelectItem[] = [];
  sortOrder: number = 1; // Initialize to default value
  sortField: string = ''; // Initialize to empty string
  sortKey: any;
  @ViewChild('dt') dt: Table | undefined;
  constructor(private bookService: BookService,private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.bookService.getAll().subscribe(data => this.books = data);

    this.sortOptions = [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'}
    ];

    this.primengConfig.ripple = true;
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

  getImageUrl(image: any): string {
    if (image) {
      const binaryData = [];
      binaryData.push(image);
      return 'data:image/jpeg;base64,' + window.btoa(binaryData.reduce((data, byte) => {
        return data + String.fromCharCode(byte);
      }, ''));
    } else {
      return '';
    }
  }

}
