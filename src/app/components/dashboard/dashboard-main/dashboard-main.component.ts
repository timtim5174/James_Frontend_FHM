import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../components/user/user.service';
import { User, UserInfo } from '../../../components/user/user';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {
  user: User = {
    firstname: '',
    lastname: '',
    birth: new Date(),
    email: '',
    password: ''
  };
  data: [{
    user: UserInfo,
    img: SafeUrl,
    bookName: string,
    members: number
    incomes: number,
    outgoings: number
  }];

  img: SafeUrl;
  members = 5;
  bookName = 'Testbook';
  incomes = 2000;
  outgoings = -2500;
  constructor(private userService: UserService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.userService.getUserData().subscribe(data => {
      this.user = data;
    });
    this.userService.getUserImage().subscribe(img => {
      if (img != null) {
        this.img = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(img));
      }
    });
  }
}
