import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { User } from '../../user/user';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { AlertCloseableComponent } from '../../../shared/notifications/alert-closeable/alert-closeable.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedSidebarService } from '../../sidebar/shared-sidebar.service';

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
  login = false;
  @Input() authGuardRedirect: string;

  @ViewChild('SignInCloseableAlert')
  private closeableAlert: AlertCloseableComponent;

  noValidEmail = 'Enter a valid email address';
  emailRequired = 'Enter your email';
  passwordRequired = 'Enter your password';

  constructor(private router: Router, private userService: UserService, public activeModal: NgbActiveModal,
    private sharedSidebarService: SharedSidebarService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.login = true;
    this.userService.signIn(this.user).subscribe(
      success => {
        this.activeModal.close();
        if (this.authGuardRedirect) {
          this.router.navigate([this.authGuardRedirect]);
        } else {
          this.router.navigate(['/main/dashboard']);
        }
      },
      error => {
        this.login = false;
        this.closeableAlert.reOpenAlert();
        this.errorMessage = 'Email or password false';
      }
    );
  }
}
