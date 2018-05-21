import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    if (document.cookie.includes('jwt-token')) {
      this.userService.isAuthenticated = true;
    }
  }

  get isAuthenticated() {
    return this.userService.isAuthenticated;
  }
}
