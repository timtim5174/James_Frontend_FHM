import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Transaction } from '../transaction';
import { SharedBookService } from '../../book/shared-book.service';
import { Book } from '../../book/book';
import { AlertCloseableComponent } from '../../../shared/notifications/alert-closeable/alert-closeable.component';
import { DatepickerComponent } from '../../../shared/datepicker/datepicker.component';
import { TransactionService } from '../transaction.service';
import { Category } from '../../category/category';
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
    amount: null,
    rangeEnum: null,
    timeFrame: null,
    creationDate: null
  };
  book: Book;
  preSelectedCategory: Partial<Category> = {
    categoryId: ''
  };
  categorys: Category[] = [];
  errorMessage = '';
  isOptionsOpened = false;


  createClicked = false;
  @ViewChild('CreateTransactionCloseableAlert')
  private closeableAlert: AlertCloseableComponent;

  @ViewChild('MyDatepicker')
  private datepicker: DatepickerComponent;
  datepickerDate: NgbDateStruct;
  dateManuallyPicked = false;

  constructor(
    public activeModal: NgbActiveModal,
    private sharedBookService: SharedBookService,
    private transactionService: TransactionService,
    private sharedCategoryService: SharedCategoryService) { }

  ngOnInit() {
    this.sharedBookService.getBookData().subscribe(book => {
      this.book = book;
      this.newTransaction.bookId = this.book.id;
      this.sharedCategoryService.getCategorys().subscribe(categorys => {
        this.categorys.push(...categorys);
        this.preSelectedCategory = this.categorys.find(category => category.name === 'Salary');
        this.newTransaction.categoryId = this.preSelectedCategory.categoryId;
      });
    });
  }

  onSubmit() {
    this.createClicked = true;
    this.transactionService.createTransaction(this.newTransaction).subscribe(
      data => {
        this.activeModal.close(data);
      },
      error => {
        this.createClicked = false;
        this.closeableAlert.reOpenAlert();
        this.errorMessage = 'The settlement date can not be in the past';
      }
    );
  }

  rangeEnumChanged() {
    /* this.newTransaction.timeFrame = null; */
  }

  loadExampleDate() {
    this.datepickerDate = {
      year: 2019,
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
