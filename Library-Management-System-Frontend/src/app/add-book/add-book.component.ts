import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../services/book.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  submitted: boolean=false;
  bookForm: FormGroup;
  selectedFile?: File | null;
  imagePreview?:string | ArrayBuffer | null;
  // progress = 0;
  // message = '';
  // fileInfos?: Observable<any>;
  // urlString?:string;


  constructor(private fb: FormBuilder,private bookService:BookService,public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      author: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      numberCopies: ['', Validators.required]

    });
  }
  ngOnInit(): void {
    // this.fileInfos = this.bookService.getFiles();
  }

  saveBook() {
    if (this.bookForm.valid && this.selectedFile) {
      const formData:FormData=new FormData();
      formData.append('file',this.selectedFile);
      formData.append('title', this.bookForm.get('title')?.value);
      formData.append('authorName', this.bookForm.get('author')?.value);
      formData.append('category', this.bookForm.get('category')?.value);
      formData.append('status', this.bookForm.get('status')?.value);
      formData.append('description', this.bookForm.get('description')?.value);
      formData.append('numberCopies', this.bookForm.get('numberCopies')?.value);
      this.bookService.create(formData).subscribe({
        next: (data) => {
          console.log(data);
          this.submitted = true;
          this.ref.close();
        },
        error: (e) => {
          console.error(e)
        }
      });
      // if (this.urlString) {
      //   const url =this.urlString;
      //   this.bookService.create({ title, category, author, status, description, numberCopies,url }).subscribe({
      //     next: (data) => {
      //       console.log(data);
      //       this.submitted = true;
      //       this.ref.close();
      //     },
      //     error: (e) => {
      //       console.error(e)
      //     }
      //   });
      // } else {
      //   console.error("No file uploaded.");
      // }
    }
  }
  OnFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    // this.file=this.selectedFiles?.item(0);
    // console.log(this.file.url)
  }

  previewImage(){
    if (this.selectedFile){
      const reader =new FileReader();
      reader.onload=()=>{
        this.imagePreview=reader.result
      }
      reader.readAsDataURL(this.selectedFile);
    }
    else {
      console.error("No file selected.");
    }

  }
  // upload(): void {
  //   this.progress = 0;
  //
  //   if (this.selectedFiles) {
  //     const file: File | null = this.selectedFiles.item(0);
  //
  //     if (file) {
  //       this.currentFile = file;
  //       this.urlString = URL.createObjectURL(file).toString();
  //
  //       this.bookService.upload(this.currentFile).subscribe({
  //         next: (event: any) => {
  //           if (event.type === HttpEventType.UploadProgress) {
  //             this.progress = Math.round(100 * event.loaded / event.total);
  //           } else if (event instanceof HttpResponse) {
  //             this.message = event.body.message;
  //             this.fileInfos = this.bookService.getFiles();
  //           }
  //         },
  //         error: (err: any) => {
  //           console.log(err);
  //           this.progress = 0;
  //
  //           if (err.error && err.error.message) {
  //             this.message = err.error.message;
  //           } else {
  //             this.message = 'Could not upload the file!';
  //           }
  //
  //           this.currentFile = undefined;
  //         }
  //       });
  //     }
  //   }
  // }

}

