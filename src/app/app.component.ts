import { Component } from '@angular/core';
import { UserService } from './shared/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private userService: UserService) {
  }

  get isAuthenticated() {
    return this.userService.isAuthenticated;
  }
}
