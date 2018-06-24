import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TransactionService } from '../transaction.service';
import { SharedCategoryService } from '../../category/shared-category.service';
import { Transaction } from '../transaction';
import { DatepickerComponent } from '../../../shared/datepicker/datepicker.component';
import { AlertCloseableComponent } from '../../../shared/notifications/alert-closeable/alert-closeable.component';
import { Category } from '../../category/category';

@Component({
  selector: 'app-update-transaction',
  templateUrl: './update-transaction.component.html',
  styleUrls: ['./update-transaction.component.scss']
})
export class UpdateTransactionComponent implements OnInit {
  newTransaction: Partial<Transaction>;
  oldTransaction: Partial<Transaction>;
  isOptionsOpened = false;
  categorys: Category[] = [];
  selectedCategory: Category;

  errorMessage = '';
  @ViewChild('UpdateTransactionCloseableAlert')
  private closeableAlert: AlertCloseableComponent;

  @ViewChild('MyDatepicker')
  private datepicker: DatepickerComponent;
  datepickerDate: NgbDateStruct;
  dateManuallyPicked = true;
  updateClicked = false;

  @Input() modalInput: Transaction;

  constructor(
    public activeModal: NgbActiveModal,
    private transactionService: TransactionService,
    private sharedCategoryService: SharedCategoryService) { }

  ngOnInit() {
    this.newTransaction = { ...this.modalInput };
    this.sharedCategoryService.getCategorys().subscribe(categorys => {
      this.categorys.push(...categorys);
      this.selectedCategory = this.categorys[0];
    });
  }

  onSubmit() {
    this.updateClicked = true;
    this.transactionService.updateTransaction(this.newTransaction).subscribe(
      data => {
        this.activeModal.close(this.newTransaction);
      },
      error => {
        this.errorMessage = 'The settlement date can not be in the past';
        this.updateClicked = false;
        this.closeableAlert.reOpenAlert();
      }
    );
  }

  rangeEnumChanged() {
    this.newTransaction.timeFrame = null;
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
      year: new Date(this.newTransaction.timeFrame).getFullYear(),
      month: new Date(this.newTransaction.timeFrame).getMonth() + 1,
      day: new Date(this.newTransaction.timeFrame).getDate()
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
