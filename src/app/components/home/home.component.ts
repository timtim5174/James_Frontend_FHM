import { Component, OnInit } from '@angular/core';
import { SharedUserService } from '../user/shared-user.service';
import { UserService } from '../user/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  logOutMessage = '';
  constructor(private sharedService: SharedUserService, private userService: UserService) {
    this.sharedService.getSignOutSubject().subscribe(
      message => this.userService.isAuthenticated ? this.logOutMessage = '' : this.logOutMessage = message
    );
  }

  ngOnInit() {
    setTimeout(() => { this.logOutMessage = ''; }, 2000);
  }



}
