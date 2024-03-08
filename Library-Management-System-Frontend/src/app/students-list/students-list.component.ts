import { Component, OnInit } from '@angular/core';
import {StudentService} from "../services/student.service";
import {MessageService} from "primeng/api";
import {BookDetailsComponent} from "../book-details/book-details.component";
import {UserDetailsComponent} from "../user-details/user-details.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  ref?: DynamicDialogRef;
  students:any;
  constructor(private studentService:StudentService,private messageService: MessageService,private dialogService:DialogService) { }

  ngOnInit(): void {
    this.retrieveStudents()
  }
  retrieveStudents(): void {

    this.studentService.getAll()
      .subscribe(
        (response: any) => {
          this.students = response;
          console.log(this.students);
        },
        (error: any) => {
          console.log(error);
        });
  }

  deleteStudent(tuto:any): void {
    this.studentService.delete(tuto.id)
      .subscribe({
        next: (res:any) => {
          console.log(res);
          this.refreshList();
        },
        error: (e:any) => console.error(e)
      });
    this.messageService.add({severity:'success', summary:'Success', detail:'Data Deleted'});

  }

  private refreshList() {
    this.retrieveStudents() ;
  }

  showHistory(student: any) {
    this.ref = this.dialogService.open(UserDetailsComponent, {
      header: 'Details of' + student.username,
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      data: {
        userId: student.id // Pass any additional data needed to fetch books by author
      }});
    this.ref.onClose.subscribe();
  }
}
