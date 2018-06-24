import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTransactionComponent } from './update-transaction.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionService } from '../transaction.service';
import { SharedCategoryService } from '../../category/shared-category.service';
import { Transaction } from '../transaction';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../category/category';
import { share } from 'rxjs/operators';

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

xdescribe('UpdateTransactionComponent', () => {
  let updateTransactionComponent: UpdateTransactionComponent;
  let activeModal: NgbActiveModal;
  let transactionService: TransactionService;
  let sharedCategoryService: SharedCategoryService;
  let oldTransaction: Partial<Transaction>;
  let newTransaction: Partial<Transaction>;

  beforeAll(async(() => {
    activeModal = new NgbActiveModal();
    transactionService = new TransactionService(new HttpClient({} as HttpHandler));
    sharedCategoryService = new MockSharedCategoryService();
    updateTransactionComponent = new UpdateTransactionComponent(activeModal, transactionService, sharedCategoryService);
    oldTransaction = {
      id: '1',
      title: 'Old test transaction',
      categoryId: '1',
      amount: 50.5
    };
    newTransaction = {
      id: '1',
      title: 'Updated test transaction',
      categoryId: '1',
      amount: 100
      };
  }));

  it('should update', () => {
    updateTransactionComponent.newTransaction = newTransaction;
    updateTransactionComponent.oldTransaction = oldTransaction;
    const spy = spyOn(transactionService, 'createTransaction')
      .and.returnValue(new Observable<Transaction>());
    updateTransactionComponent.onSubmit();
    expect(transactionService.updateTransaction).toHaveBeenCalledTimes(1);
  });
});
