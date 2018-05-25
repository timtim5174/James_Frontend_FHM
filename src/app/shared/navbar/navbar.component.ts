import { Component, OnInit, Input, Output } from '@angular/core';
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { MyAccountComponent } from '../../components/my-account/my-account.component';
import { UserService } from '../user/user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  signInComponent = SignInComponent;
  title = 'James';
  navbarIsCollapsed = true;
  img;
  @Input() isAuthenticated: boolean;

  constructor(private userService: UserService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.setUserIcon();
  }

  onUserIconChange() {
    this.setUserIcon();
  }

  setUserIcon() {
    this.userService.getImageFile().subscribe(res => {
      this.img = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res));
    }, error => {
      // otherwise show default user icon
      this.img = '';
    });
  }
}
