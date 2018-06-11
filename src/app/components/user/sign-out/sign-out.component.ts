import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { SharedUserService } from '../shared-user.service';




@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {
  signOutMessage = 'You have been successfully logged out!';

  constructor(private userService: UserService, private router: Router, private sharedService: SharedUserService) {
    this.userService.signOut();
    this.router.navigate(['/home']);
    this.sharedService.setSignOutSubject(this.signOutMessage);
  }

  ngOnInit() {
  }

}

