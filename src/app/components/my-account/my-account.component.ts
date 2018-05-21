import { Component, OnInit, ViewChild} from '@angular/core';
import { User } from './../../shared/user/user';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../shared/user/user.service';
import { AlertCloseableComponent } from '../../shared/notifications/alert-closeable/alert-closeable.component';
import { DatepickerComponent } from '../../shared/datepicker/datepicker.component';

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
  datepickerDate: NgbDateStruct;

  @ViewChild('MyAccountClosableAlert')
  private closeableAlert: AlertCloseableComponent;

  @ViewChild('MyDatepicker')
  private datepicker: DatepickerComponent;

  user: User = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    birth: ''
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
      this.datepickerDate = {
        year: Number(this.user.birth.substring(0, 4)),
        month: Number(this.user.birth.substring(5, 7)),
        day: Number(this.user.birth.substring(8, 10))
      };
      this.datepicker.initDate(this.datepickerDate);
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

    this.userService.updateUser(this.user).subscribe(response => {
      this.closeableAlert.reOpenAlert();
      this.alertMessage = response.message;
      this.alertStyle = 'success';
      setTimeout(() => {
        this.closeableAlert.closeAlert();
      }, 3000);
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
