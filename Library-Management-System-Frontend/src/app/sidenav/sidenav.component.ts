import {Component, Input, OnInit} from '@angular/core';
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() visibleSidebar1 :any;
  userRole?:String;

  constructor(private storageService:StorageService) { }

  ngOnInit(): void {
    this.retreiveUserRole()
    {
      this.userRole=this.storageService.getUser().roles[0];

    }
  }

  retreiveUserRole()
  {
    this.userRole=this.storageService.getUser().roles[0];

  }

}
