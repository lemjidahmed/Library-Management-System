import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthService} from "../services/auth.service";
import {StorageService} from "../services/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items!: MenuItem[];
  visibleSidebar1:any;
  role?:string;
  constructor(private authService:AuthService,private storageService:StorageService,private router: Router) {
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
              { label: 'Profile', icon: 'pi pi-user' },
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
            { label: 'Profile', icon: 'pi pi-user' },
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

}
