import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user/user.service';




@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {
  signOutMessage = 'You have been successfully logged out!';

  constructor(private userService: UserService, private router: Router) {
    this.userService.signOut();
    setTimeout(this.redirectToHome.bind(this), 2500);
  }

  ngOnInit() {
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }
}

