import { Component, OnInit } from '@angular/core';
import {StudentService} from "../services/student.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  students:any;
  constructor(private studentService:StudentService,private messageService: MessageService) { }

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
}
