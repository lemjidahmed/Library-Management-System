import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {AuthService} from "../services/auth.service";
import {AuthorService} from "../services/author.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  submitted: boolean=false;
  authorForm: FormGroup;

  constructor(private fb: FormBuilder,private authorService:AuthorService,public ref: DynamicDialogRef, public config: DynamicDialogConfig,public messageService: MessageService) {
    this.authorForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  newAuthor() {
    this.submitted = false;
    this.authorForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  saveAuthor() {
    if (this.authorForm.valid) {
      const nameControl = this.authorForm.get('name');
      const descriptionControl = this.authorForm.get('description');
      if (nameControl && descriptionControl) {
        const name = nameControl.value;
        const description = descriptionControl.value;

        this.authorService.create({name, description}).subscribe({
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
    this.messageService.add({severity:'success', summary:'Success', detail:'New Author Added Successfully'});
  }


}
