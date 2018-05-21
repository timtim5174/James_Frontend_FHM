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
  img = './assets/nobody_m.original.jpg';
  selectedFile: File = null;

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
      this.showResponse(response.message, 'success');
    }, error => {
      this.showResponse(error, 'danger');
    });
  }

  passwordChange() {
    this.isPasswordChanged = !this.isPasswordChanged;
    this.newPassword = '';
    this.verifyPassword = '';
  }

  onImageSelected(event) {
   const reader: any = new FileReader();
   if (event.target.files && event.target.files.length > 0) {
    this.selectedFile = event.target.files[0];
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (e) => {
      this.img = e.target.result;
    };
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.userService.uploadFile(fd).subscribe(response => {
      this.showResponse(response.message, 'success');
    }, error => {
      this.showResponse(error, 'danger');
    });
  }
}

  showResponse(message: string, style: string) {
    this.closeableAlert.reOpenAlert();
    this.alertMessage = message;
    this.alertStyle = style;
    setTimeout(() => {
      this.closeableAlert.closeAlert();
    }, 5000);
  }
}
