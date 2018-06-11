import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../user';
import { AlertCloseableComponent } from '../../../shared/notifications/alert-closeable/alert-closeable.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  @Input() modalInput: User;
  user: Partial<User> = {
    password: ''
  };
  errorMessage = '';
  passwordRequired = 'Enter your password';
  deleteClicked = false;

  @ViewChild('DeleteUserCloseableAlert')
  private closeableAlert: AlertCloseableComponent;

  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit() {
    this.user = { ...this.modalInput, ...this.user };
  }

  onSubmit() {
    this.deleteClicked = true;
    this.userService.deleteUser(this.user.password).subscribe(
      success => this.activeModal.close(this.user),
      error => {
        this.closeableAlert.reOpenAlert();
        this.errorMessage = error;
        this.deleteClicked = false;
      }
    );
  }

}
