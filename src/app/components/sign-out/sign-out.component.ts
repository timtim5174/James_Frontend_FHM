import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user/user.service';
import { SharedSignOutService } from './shared-sign-out.service';




@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {
  signOutMessage = 'You have been successfully logged out!';

  constructor(private userService: UserService, private router: Router, private sharedService: SharedSignOutService) {
    this.userService.signOut();
    this.router.navigate(['/home']);
    setTimeout(this.redirectToHome.bind(this), 50);
  }

  ngOnInit() {
  }

  redirectToHome() {
    this.sharedService.errorMessage.emit(this.signOutMessage);
  }
}

