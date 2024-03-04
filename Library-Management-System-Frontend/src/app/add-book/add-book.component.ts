import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../services/book.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  submitted: boolean=false;
  bookForm: FormGroup;

  constructor(private fb: FormBuilder,private bookService:BookService,public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      author: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // newBook() {
  //   this.submitted = false;
  //   this.bookForm = this.fb.group({
  //     title: ['', Validators.required],
  //     category: ['', Validators.required],
  //     author: ['', Validators.required],
  //     status: ['', Validators.required],
  //     description: ['', Validators.required]
  //   });
  // }

  saveBook() {
    if (this.bookForm.valid) {
      const { title, category,author,status,description } = this.bookForm.value;


        this.bookService.create({ title, category,author,status,description }).subscribe({
          next: (data) => {
            console.log(data);
            this.submitted = true;
            this.ref.close();
          },
          error: (e) => {
            console.error(e)
          }
        });
      }
    }

  ngOnInit(): void {
  }
}

