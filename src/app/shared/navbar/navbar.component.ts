import { Component, OnInit, Input } from '@angular/core';
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { MyAccountComponent } from '../../components/my-account/my-account.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  signInComponent = SignInComponent;
  title = 'James';
  navbarIsCollapsed = true;
  @Input() isAuthenticated: boolean;

  constructor() {
  }

  ngOnInit() {
  }
}
