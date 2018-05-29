import { Component, OnInit, Input } from '@angular/core';
import { UserService } from './components/user/user.service';
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
      this.loadUserData();
    }
    this.changeAuthenticationStatus = this.userService.getChangeAuthenticationStatus().subscribe(status => {
      if (status && !this.toggle) {
        this.handleToggle();
      } else if (!status && this.toggle) {
        this.handleToggle();
      }

      if (status) {
        this.loadUserData();
      }
    });
  }

  handleToggle() {
    if (this.toggle) {
      document.getElementById('page-content').style.marginLeft = '0';
    } else {
      document.getElementById('page-content').style.marginLeft = '250px';
    }
    this.toggle = !this.toggle;
  }

  get isAuthenticated() {
    return this.userService.isAuthenticated;
  }

  loadUserData() {
    this.userService.receiveUserImage().subscribe(img => {
      this.userService.setUserImage(img);
    });
  }
}
