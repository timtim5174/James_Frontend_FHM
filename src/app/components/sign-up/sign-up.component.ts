import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user/user';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: User = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordCheck: '',
    birth: ''
  };


  firstnameRequired = 'Enter your firstname';
  lastnameRequired = 'Enter your lastname';
  birthdayRequired = 'Enter your birthday';
  invalidBirthFormat = 'Enter your date of birth in format yyyy-mm-dd';
  noValidEmail = 'Enter a valid email address';
  emailRequired = 'Enter your email';
  passwordRequired = 'Enter your password';
  passwordCheckInvalid = 'Passwords must match';


  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
  }

  onSave(event: NgbDateStruct) {
    this.user.birth = `${event.year}-${event.month}-${event.day}`;
  }

}
