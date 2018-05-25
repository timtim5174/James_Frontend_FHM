import { Component, OnInit, Input } from '@angular/core';
import { UserService } from './shared/user/user.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  @Input() toggle = false;
  changeAuthenticationStatus: Subscription;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    if (document.cookie.includes('jwt-token')) {
      this.userService.isAuthenticated = true;
    }
    this.changeAuthenticationStatus = this.userService.getChangeAuthenticationStatus().subscribe(status => this.authToggle(status));
  }

  authToggle(status: boolean) {
    if (status && !this.toggle) {
      this.handleToggle();
    } else if (!status && this.toggle) {
      this.handleToggle();
    }
  }

  handleToggle() {
    if (this.toggle) {
      document.getElementById('page-content').style.marginLeft = '0';
    } else {
      document.getElementById('page-content').style.marginLeft = '160px';
    }
    this.toggle = !this.toggle;
  }

  get isAuthenticated() {
    return this.userService.isAuthenticated;
  }

}
