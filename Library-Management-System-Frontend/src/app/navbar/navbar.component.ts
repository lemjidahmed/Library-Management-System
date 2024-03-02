import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items!: MenuItem[];
  visibleSidebar1 = false;

  ngOnInit() {
    this.items = [
      {
        label:'Tutorials',
        icon:'pi pi-fw pi-file',
        routerLink: '/tutorials'
      },
      {
        label:'Add',
        icon:'pi pi-fw pi-plus',
        routerLink: '/add'
      },
      {
        label: 'username',
        icon: 'pi pi-user',
        items: [
          { label: 'Profile', icon: 'pi pi-user' },
          { label: 'Logout', icon: 'pi pi-sign-out'}
        ],
      }
    ];
  }

  toggleSidebar() {
    this.visibleSidebar1 = !this.visibleSidebar1;
  }
}
