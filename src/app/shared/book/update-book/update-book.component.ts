import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from '../book.service';
import { Book } from '../book';
import { AlertCloseableComponent } from '../../notifications/alert-closeable/alert-closeable.component';
import { DatepickerComponent } from '../../datepicker/datepicker.component';



@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent implements OnInit {
  newBook: Partial<Book>;
  errorMessage = '';
  isOptionsOpened = false;
  createClicked = false;

  @ViewChild('UpdateBookCloseableAlert')
  private closeableAlert: AlertCloseableComponent;

  @ViewChild('MyDatepicker')
  private datepicker: DatepickerComponent;
  datepickerDate: NgbDateStruct;
  dateManuallyPicked = false;


  constructor(public activeModal: NgbActiveModal, private bookService: BookService) { }
  @Input() modalInput: Book;

  ngOnInit() {
    this.newBook = { ...this.modalInput };
  }

  onSubmit() {
    this.createClicked = true;
    this.bookService.updateBook(this.newBook).subscribe(
      success => this.activeModal.close(this.newBook),
      error => {
        this.closeableAlert.reOpenAlert();
        this.errorMessage = error;
      }
    );
  }

  rangeEnumChanged() {
    this.newBook.timeFrame = new Date(2018, 0, 1, 0, 0, 0, 0);
  }

  switchIsOptionsOpened() {
    this.isOptionsOpened === false ? this.isOptionsOpened = true : this.isOptionsOpened = false;
    if (this.isOptionsOpened === true && !this.dateManuallyPicked) {
      setTimeout(this.loadExampleDate.bind(this), 10);
    }
    if (this.isOptionsOpened === true && this.dateManuallyPicked) {
      setTimeout(this.loadManuallyPickedDate.bind(this), 10);
    }
  }

  loadExampleDate() {
    this.datepickerDate = {
      year: 2018,
      month: 1,
      day: 1
    };
    this.datepicker.initDate(this.datepickerDate);
  }

  loadManuallyPickedDate() {
    this.datepickerDate = {
      year: this.newBook.timeFrame.getFullYear(),
      month: this.newBook.timeFrame.getMonth() + 1,
      day: this.newBook.timeFrame.getDate()
    };
    this.datepicker.initDate(this.datepickerDate);
  }

  datePicked(date: NgbDateStruct) {
    this.newBook.timeFrame = new Date(date.year, date.month - 1, date.day);
    this.dateManuallyPicked = true;
  }

  explanationText() {
    const monthly = `The recurring period in which a book is reseted. The default value is the 1st of the month.
    For exampe, if you choose August 15th of any month and year, the book will always been reseted every 15th of the month.`;

    const yearly = `The recurring period in which a book is reseted. The default value is January 1st of the year.
    For example, if you choose August 15th of any year, the book will always been reseted on August 15th.`;

    return this.newBook.rangeEnum === 'MONTHLY' ? monthly : yearly;
  }

}
