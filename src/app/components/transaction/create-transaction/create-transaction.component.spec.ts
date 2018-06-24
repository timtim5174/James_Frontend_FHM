import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransactionComponent } from './create-transaction.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedBookService } from '../../book/shared-book.service';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transaction';
import { SharedCategoryService } from '../../category/shared-category.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Book } from '../../book/book';
import { Observable } from 'rxjs';
import { Category } from '../../category/category';

class MockSharedBookService extends SharedBookService {
  getBookData() {
    return new Observable<Book>(book => {
      book.next({
        id: '1',
        title: 'Book title',
        creationDate: new Date(),
        timeFrame: new Date(),
        rangeEnum: 'MONTHLY'
      });
    });
  }
}

class MockSharedCategoryService extends SharedCategoryService {
  getCategorys() {
    return new Observable<Category[]>(category => {
      category.next([
        {
        categoryId: '1',
        name: 'category 1',
        superCategoryId: null,
        bookId: '1',
        paymentFlag: 'E',
        presumedAmount: 50,
        creationDate: new Date()
      },
      {
        categoryId: '2',
        name: 'category 2',
        superCategoryId: null,
        bookId: '1',
        paymentFlag: 'E',
        presumedAmount: 60,
        creationDate: new Date()
      }
      ]);
    });
  }
}

describe('CreateTransactionComponent', () => {
  let createTransactionComponent: CreateTransactionComponent;
  let activeModal: NgbActiveModal;
  let sharedBookService: MockSharedBookService;
  let transactionService: TransactionService;
  let sharedCategoryService: MockSharedCategoryService;
  let newTransaction: Partial<Transaction>;

  beforeAll(() => {
    activeModal = new NgbActiveModal();
    sharedBookService = new MockSharedBookService();
    transactionService = new TransactionService(new HttpClient({} as HttpHandler));
    sharedCategoryService = new MockSharedCategoryService();
    createTransactionComponent = new CreateTransactionComponent(activeModal, sharedBookService, transactionService, sharedCategoryService);
    newTransaction = {
      title: 'Test transaction',
      categoryId: '1',
      amount: 50.5
    };
  });

  it('should create', () => {
    createTransactionComponent.newTransaction = newTransaction;
    const spy = spyOn(transactionService, 'createTransaction')
      .and.returnValue(new Observable<Transaction>());
    createTransactionComponent.onSubmit();
    expect(transactionService.createTransaction).toHaveBeenCalledTimes(1);
  });

});
