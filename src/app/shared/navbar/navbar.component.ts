import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { MyAccountComponent } from '../../components/my-account/my-account.component';
import { UserService } from '../user/user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnChanges {
  signInComponent = SignInComponent;
  title = 'James';
  navbarIsCollapsed = true;
  img;
  @Input() isAuthenticated: boolean;

  constructor(private userService: UserService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.userService.getUserImage().subscribe(img => {
      if (img != null) {
        this.img = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(img));
      }
    }, error => {
      this.img = '';
    });
  }

  ngOnChanges() {
    // load user icon when user is authenticated
    if (this.isAuthenticated) {
      this.userService.getImageFile().subscribe(img => {
        this.userService.setUserImg(img);
      }, error => {
        this.img = '';
      });
    }
  }
}
