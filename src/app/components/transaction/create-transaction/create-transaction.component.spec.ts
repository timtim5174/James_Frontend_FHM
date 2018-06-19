import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransactionComponent } from './create-transaction.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedBookService } from '../../book/shared-book.service';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transaction';
import { SharedCategoryService } from '../../category/shared-category.service';

describe('CreateTransactionComponent', () => {
  let createTransactionComponent: CreateTransactionComponent;
  let activeModal: NgbActiveModal; // tslint:disable-line
  let sharedBookService: SharedBookService; // tslint:disable-line
  let transactionService: TransactionService; // tslint:disable-line
  let sharedCategoryService: SharedCategoryService; // tslint:disable-line
  let newTransaction: Partial<Transaction>;

  beforeAll(() => {
    createTransactionComponent = new CreateTransactionComponent(activeModal, sharedBookService, transactionService, sharedCategoryService);
    newTransaction = {
      title: 'Test transaction',
      comment: 'Test comment',
      bookId: '1',
      categoryId: '1',
      amount: 50.5,
      rangeEnum: null,
      timeFrame: null,
      creationDate: null
    };
  });

    it('should create', () => {
      /* this.createTransactionComponent.newTransaction = newTransaction;
      this.createTransactionComponent.onSubmit();
      expect(this.createTransactionComponent).toBeFalsy(); */
    });

});
