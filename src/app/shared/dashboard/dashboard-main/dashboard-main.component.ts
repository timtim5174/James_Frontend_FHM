import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user';
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
  img: SafeUrl;
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