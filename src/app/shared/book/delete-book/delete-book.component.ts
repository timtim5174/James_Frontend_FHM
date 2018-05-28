import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from '../book.service';
import { Book } from '../book';
import { DatepickerComponent } from '../../datepicker/datepicker.component';
import { AlertCloseableComponent } from '../../notifications/alert-closeable/alert-closeable.component';


@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit {
  @Input() modalInput: Book;
  book: Book;
  errorMessage = '';
  passwordRequired = 'Enter your password';
  deleteClicked = false;

  @ViewChild('DeleteBookCloseableAlert')
  private closeableAlert: AlertCloseableComponent;

  constructor(public activeModal: NgbActiveModal, private bookService: BookService) { }

  ngOnInit() {
    this.book = { ...this.modalInput };
    this.book.title = '';
  }

  onSubmit() {
    this.deleteClicked = true;
    this.bookService.deleteBook(this.book.id).subscribe(
      success => this.activeModal.close(this.book),
      error => {
        this.closeableAlert.reOpenAlert();
        this.errorMessage = error;
      }
    );
  }

}
