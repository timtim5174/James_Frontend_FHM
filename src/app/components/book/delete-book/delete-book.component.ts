import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from '../book.service';
import { Book } from '../book';
import { AlertCloseableComponent } from '../../../shared/notifications/alert-closeable/alert-closeable.component';
import { SharedBookService } from '../shared-book.service';


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

  constructor(public activeModal: NgbActiveModal, private bookService: BookService, private sharedBookService: SharedBookService) { }

  ngOnInit() {
    this.sharedBookService.getUpdateDeleteBookSubject().subscribe(
      book => this.book = book
    );
    this.book = { ...this.modalInput };
    this.modalInput.title = '';
  }

  onSubmit() {
    this.deleteClicked = true;
    this.bookService.deleteBook(this.book.id).subscribe(
      success => this.activeModal.close(this.book),
      error => {
        this.closeableAlert.reOpenAlert();
        this.errorMessage = error;
        this.deleteClicked = false;
      }
    );
  }

}
