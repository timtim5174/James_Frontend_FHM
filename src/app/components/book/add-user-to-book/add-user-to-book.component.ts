import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from '../book.service';
import { Book } from '../book';
import { DatepickerComponent } from '../../../shared/datepicker/datepicker.component';
import { AlertCloseableComponent } from '../../../shared/notifications/alert-closeable/alert-closeable.component';
import { SharedBookService } from '../shared-book.service';
import { User } from '../../user/user';


@Component({
  selector: 'app-add-user-to-book',
  templateUrl: './add-user-to-book.component.html',
  styleUrls: ['./add-user-to-book.component.scss']
})
export class AddUserToBookComponent implements OnInit {
  book: Book;
  user: Partial<User> = {
    email: ''
  };
  addClicked = false;
  errorMessage = '';
  noValidEmail = 'Enter a valid email address';
  emailRequired = 'Enter an email';

  @ViewChild('AddUserToBookCloseableAlert')
  private closeableAlert: AlertCloseableComponent;

  constructor(public activeModal: NgbActiveModal, private bookService: BookService, private sharedBookService: SharedBookService) {
  }

  ngOnInit() {
    this.sharedBookService.getAddUserToBookSubbject().subscribe(
      book => this.book = book
    );
  }

  onSubmit() {
    this.addClicked = true;
    this.bookService.addUserToBook(this.book, this.user).subscribe(
      success => this.activeModal.close(),
      error => {
        this.closeableAlert.reOpenAlert();
        this.errorMessage = error;
        this.addClicked = false;
      }
    );
  }

}
