import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
  @Input() authGuardRedirect: string;

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
        this.closeModalBox();
        if (this.authGuardRedirect) {
          this.router.navigate([this.authGuardRedirect]);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error => {
        this.closeableAlert.reOpenAlert();
        this.errorMessage = error;
      }
    );
  }

  closeModalBox() {
    this.activeModal.dismiss();
  }

}
