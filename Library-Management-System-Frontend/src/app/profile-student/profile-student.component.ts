import { Component, OnInit } from '@angular/core';
import {StudentService} from "../services/student.service";
import {StorageService} from "../services/storage.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.css']
})
export class ProfileStudentComponent implements OnInit {
  currentStudent:any= {
  username: '',
  phoneNumber:'',
  status: 'Active'
};
  message = '';
  constructor(private studentService:StudentService,private storageService:StorageService,public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.getStudent(this.storageService.getUser().id)
  }
  getStudent(id: string): void {
    this.studentService.get(id)
      .subscribe({
        next: (data) => {
          this.currentStudent = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateStudent(): void {
    this.message = '';

    this.studentService.update(this.currentStudent.id, this.currentStudent)
      .subscribe({
        next: (res:any) => {
          console.log(res);
          this.message = res.message ? res.message : 'This tutorial was updated successfully!';
          this.ref.close();
        },
        error: (e:any) => console.error(e)
      });
  }
}
