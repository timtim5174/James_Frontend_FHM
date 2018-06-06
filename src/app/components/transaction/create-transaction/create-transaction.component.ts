import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Transaction } from '../transaction';
import { SharedBookService } from '../../book/shared-book.service';
import { Book } from '../../book/book';
import { AlertCloseableComponent } from '../../../shared/notifications/alert-closeable/alert-closeable.component';
import { DatepickerComponent } from '../../../shared/datepicker/datepicker.component';
import { SharedTransactionService } from '../shared-transaction.service';
import { TransactionService } from '../transaction.service';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/category';
import { retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SharedCategoryService } from '../../category/shared-category.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {
  newTransaction: Partial<Transaction> = {
    title: '',
    comment: '',
    bookId: '',
    categoryId: '',
    amount: 0,
    rangeEnum: null,
    timeFrame: new Date(2018, 10, 10),
    creationDate: null
  };
  book: Book;
  selectedCategory: Category;
  categorys: Category[] = [];
  errorMessage = '';
  isOptionsOpened = false;
  @ViewChild('CreateBookCloseableAlert')
  private closeableAlert: AlertCloseableComponent;
  @ViewChild('MyDatepicker')
  private datepicker: DatepickerComponent;
  datepickerDate: NgbDateStruct;
  dateManuallyPicked = false;

  constructor(
    public activeModal: NgbActiveModal,
    private sharedBookService: SharedBookService,
    private sharedTransactionService: SharedTransactionService,
    private transactionService: TransactionService,
    private sharedCategoryService: SharedCategoryService) { }

  ngOnInit() {
    this.sharedBookService.getBookData().subscribe(book => {
      this.book = book;
      this.newTransaction.bookId = this.book.id;
      this.sharedCategoryService.getCategorys().subscribe(categorys => {
        this.categorys.push(...categorys);
        this.selectedCategory = this.categorys[0];
      });
    });
  }

  onSubmit() {
    this.transactionService.createTransaction(this.newTransaction).subscribe(
      data => {
        this.activeModal.close(data);
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  rangeEnumChanged() {
    this.newTransaction.timeFrame = new Date(2018, 0, 1, 0, 0, 0, 0);
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
      year: this.newTransaction.timeFrame.getFullYear(),
      month: this.newTransaction.timeFrame.getMonth() + 1,
      day: this.newTransaction.timeFrame.getDate()
    };
    this.datepicker.initDate(this.datepickerDate);
  }

  datePicked(date: NgbDateStruct) {
    this.newTransaction.timeFrame = new Date(date.year, date.month - 1, date.day);
    this.dateManuallyPicked = true;
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
}
