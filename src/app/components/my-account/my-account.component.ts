import { Component, OnInit, ViewChild} from '@angular/core';
import { User } from './../../shared/user/user';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../shared/user/user.service';
import { AlertCloseableComponent } from '../../shared/notifications/alert-closeable/alert-closeable.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  isPasswordChanged = false;
  newPassword = '';
  verifyPassword = '';
  alertMessage = '';
  alertStyle = '';
  @ViewChild('MyAccountClosableAlert')
  private closeableAlert: AlertCloseableComponent;

  user: User = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    birth: ''
  };

  datepickerDate: NgbDateStruct = {
    year: Number(this.user.birth.substring(0, 4)),
    month: Number(this.user.birth.substring(5, 7)),
    day: Number(this.user.birth.substring(8, 9))
  };

  firstnameRequired = 'Enter your firstname';
  lastnameRequired = 'Enter your lastname';
  noValidEmail = 'Enter a valid email address';
  emailRequired = 'Enter your email';
  passwordRequired = 'Enter your password';
  passwordCheckInvalid = 'Passwords must match';
  errorMessage = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserData().subscribe(data => {
      this.user = data;
    }, error => {
      this.errorMessage = error;
    });
  }

  onSaveDate(event: NgbDateStruct) {
    this.user.birth = `${event.year}-${event.month}-${event.day}`;
  }

  onSave() {
    if (this.isPasswordChanged) {
      this.user.password = this.newPassword;
    }
    // update user information
    this.userService.updateUser(this.user).subscribe(response => {
      this.closeableAlert.reOpenAlert();
      this.alertMessage = response.message;
      this.alertStyle = 'success';
    }, error => {
      this.closeableAlert.reOpenAlert();
      this.alertMessage = error;
      this.alertStyle = 'danger';
    });
  }

  passwordChange() {
    this.isPasswordChanged = !this.isPasswordChanged;
    this.newPassword = '';
    this.verifyPassword = '';
  }
}
