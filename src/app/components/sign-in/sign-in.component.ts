import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../shared/user/user';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user/user.service';
import { ModalComponent } from '../../shared/modal/modal.component';

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

  noValidEmail = 'Enter a valid email address';
  emailRequired = 'Enter your email';
  passwordRequired = 'Enter your password';

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.signIn(this.user).subscribe(
      success => {
        this.router.navigate(['/home']);
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

}
