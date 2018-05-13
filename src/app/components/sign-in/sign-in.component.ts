import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  user: Partial<User> = {
    email: '',
    password: '',
  };

  noValidEmail = 'Enter a valid email address';
  emailRequired = 'Enter your email';
  passwordRequired = 'Enter your password';
  passwordInvalid = 'Your password must have 8 characters';

  constructor() { }

  ngOnInit() {
  }

  onSubmit() { }

}
