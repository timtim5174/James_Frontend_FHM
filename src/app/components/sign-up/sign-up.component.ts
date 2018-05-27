import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../shared/user/user';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user/user.service';
import { AlertCloseableComponent } from '../../shared/notifications/alert-closeable/alert-closeable.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: User = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    passwordCheck: '',
    birth: new Date()
  };
  errorMessage = '';
  registerClicked = false;

  @ViewChild('SignUpCloseableAlert')
  private closeableAlert: AlertCloseableComponent;

  firstnameRequired = 'Enter your firstname';
  lastnameRequired = 'Enter your lastname';
  birthdayRequired = 'Enter your birthday';
  invalidBirthFormat = 'Enter your date of birth in format yyyy-mm-dd';
  noValidEmail = 'Enter a valid email address';
  emailRequired = 'Enter your email';
  passwordRequired = 'Enter your password';
  passwordCheckInvalid = 'Passwords must match';


  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.registerClicked = true;
    const userTO: User = { ...this.user };
    delete userTO.passwordCheck;
    this.userService.signUp(userTO).subscribe(
      success => this.router.navigate(['/main']),
      error => {
        this.registerClicked = false;
        this.closeableAlert.reOpenAlert();
        this.errorMessage = error;
      }
    );
  }

  onSave(event: NgbDateStruct) {
    this.user.birth = new Date(event.year, event.month - 1, event.day);
  }



}
