import { Component } from '@angular/core';
import {StorageService} from "./services/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Library-Management-System-Frontend';
  isLoggedIn: boolean;

  constructor(private storageService: StorageService) {
      this.isLoggedIn=storageService.isLoggedIn();
  }
}
