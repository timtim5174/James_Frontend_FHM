import { Component, OnInit, Input } from '@angular/core';
import { SignInComponent } from '../../components/user/sign-in/sign-in.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SharedUserService } from '../user/shared-user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  signInComponent = SignInComponent;
  title = 'James';
  navbarIsCollapsed = true;
  img: SafeUrl = ''; // if empty default user icon will be shown
  @Input() isAuthenticated: boolean;

  constructor(private sharedUserService: SharedUserService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.sharedUserService.getUserImage().subscribe(img => {
      if (img != null) {
        this.img = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(img));
      } else {
        this.img = '';
      }
    }, error => {
      this.img = '';
    });
  }
}
