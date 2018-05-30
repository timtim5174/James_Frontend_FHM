import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { User } from './../../../components/user/user';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../components/user/user.service';
import { AlertCloseableComponent } from '../../../shared/notifications/alert-closeable/alert-closeable.component';
import { DatepickerComponent } from '../../../shared/datepicker/datepicker.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SharedUserService } from '../shared-user.service';

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
  defaultImgPath = './assets/nobody_m.original.jpg';
  img: SafeUrl = this.defaultImgPath;
  uploadClicked = false;
  saveClicked = false;
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
    birth: new Date()
  };

  firstnameRequired = 'Enter your firstname';
  lastnameRequired = 'Enter your lastname';
  noValidEmail = 'Enter a valid email address';
  emailRequired = 'Enter your email';
  passwordRequired = 'Enter your password';
  passwordCheckInvalid = 'Passwords must match';
  errorMessage = '';

  constructor(private userService: UserService, private sharedUserService: SharedUserService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.sharedUserService.getUserImage().subscribe(img => {
      if (img != null) {
        this.img = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(img));
      }
    }, error => {
      this.img = this.defaultImgPath;
      this.errorMessage = error;
    });

    this.userService.getUserData().subscribe(data => {
      this.user = data;
      const mapDate: Date = new Date(this.user.birth);
      this.datepickerDate = {
        year: mapDate.getFullYear(),
        month: mapDate.getMonth() + 1,
        day: mapDate.getDate(),
      };
      this.datepicker.initDate(this.datepickerDate);
    }, error => {
      this.errorMessage = error;
    });
  }

  onSaveDate(event: NgbDateStruct) {
    this.user.birth = new Date(event.year, event.month - 1, event.day);
  }

  onSave() {
    this.saveClicked = true;
    if (this.isPasswordChanged) {
      this.user.password = this.newPassword;
    }
    this.userService.updateUser(this.user).subscribe(response => {
      this.showResponse(response.message, 'success');
      this.saveClicked = false;
    }, error => {
      this.showResponse(error, 'danger');
      this.saveClicked = false;
    });
  }

  passwordChange() {
    this.isPasswordChanged = !this.isPasswordChanged;
    this.newPassword = '';
    this.verifyPassword = '';
  }

  onImageSelected(event) {
    this.uploadClicked = true;
    const reader: any = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (e) => {
        this.img = e.target.result;
      };
      // Send file to server
      const fd = new FormData();
      fd.append('image', this.selectedFile, this.selectedFile.name);
      this.userService.uploadUserImage(fd).subscribe(responseUpload => {
        this.userService.receiveUserImage().subscribe(responseGet => {
          this.sharedUserService.setUserImage(responseGet);
        });
        this.showResponse(responseUpload.message, 'success');
        this.uploadClicked = false;
      }, error => {
        this.showResponse(error, 'danger');
        this.uploadClicked = false;
        this.img = this.defaultImgPath;
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
