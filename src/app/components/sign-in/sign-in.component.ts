import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../shared/user/user';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user/user.service';
import { AlertCloseableComponent } from '../../shared/notifications/alert-closeable/alert-closeable.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  errorMessage = '';

  @ViewChild('SignInCloseableAlert')
  private closeableAlert: AlertCloseableComponent;

  noValidEmail = 'Enter a valid email address';
  emailRequired = 'Enter your email';
  passwordRequired = 'Enter your password';

  constructor(private router: Router, private userService: UserService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.signIn(this.user).subscribe(
      success => {
        this.activeModal.dismiss();
        this.router.navigate(['/home']);
      },
      error => {
        this.closeableAlert.reOpenAlert();
        this.errorMessage = error;
      }
    );
  }

}
