import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthService} from "../services/auth.service";
import {StorageService} from "../services/storage.service";
import {Router} from "@angular/router";
import {AddBookComponent} from "../add-book/add-book.component";
import {ProfileStudentComponent} from "../profile-student/profile-student.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items!: MenuItem[];
  visibleSidebar1:any;
  role?:string;
  constructor(private authService:AuthService,private storageService:StorageService,private router: Router,private dialogService:DialogService) {
  }
  ngOnInit() {
  this.updateItems();
  }

  updateItems(){
    this.items=[]
    this.role=this.storageService.getUser().roles[0];
    if(this.role=="ROLE_ADMIN")
    {
      this.items.push(
          {
            label:'Manage Books',
            icon:'pi pi-fw pi-file',
            routerLink: '/home/gestion-books'
          },

          {
            label:'Students List',
            icon:'pi pi-fw pi-file',
            routerLink: '/home/student-list'
          },
          {
            label:'Consult books',
            icon:'pi pi-fw pi-file',
            routerLink: '/home/book-list'
          },
          {
            label: 'username',
            icon: 'pi pi-user',
            items: [
              { label: 'Profile', icon: 'pi pi-user',
                command: () => this.show()},
              { label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => this.logout()
              }
            ],
          }
      );
    }
    else {
      this.items.push(
        {
          label:'Consult books',
          icon:'pi pi-fw pi-file',
          routerLink: '/home/book-list'
        },
        {
          label: 'username',
          icon: 'pi pi-user',
          items: [
            { label: 'Profile', icon: 'pi pi-user',

            },
            { label: 'Logout',
              icon: 'pi pi-sign-out',
              command: () => this.logout()
            }
          ],
        }
      );
    }


  }

  toggleSidebar() {
    this.visibleSidebar1 = !this.visibleSidebar1;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        window.location.reload();
        // this.router.navigate(['/home']);
      },
      error: err => {
        console.log(err);
      }
    });
  }
  ref?: DynamicDialogRef;
  show() {
    this.ref = this.dialogService.open(ProfileStudentComponent, {
      header: 'Profile',
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe();
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

}
