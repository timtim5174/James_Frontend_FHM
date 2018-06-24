import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTransactionComponent } from './delete-transaction.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionService } from '../transaction.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Transaction } from '../transaction';
import { Observable } from 'rxjs';

// Unfertig und Fehlerhaft!
xdescribe('DeleteTransactionComponent', () => {
  let deleteTransactionComponent: DeleteTransactionComponent;
  let transactionService: TransactionService;
  let activeModal: NgbActiveModal;
  let transaction: Partial<Transaction>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeAll(() => {
    transactionService = new TransactionService(new HttpClient({} as HttpHandler));
    activeModal = new NgbActiveModal();
    deleteTransactionComponent = new DeleteTransactionComponent(activeModal, transactionService);
    transaction = {
      id: '1',
      title: 'Test Transaction',
      bookId: '1',
      categoryId: '1',
      amount: 50
    };
  });

  it('should delete', () => {
    deleteTransactionComponent.modalInput = transaction;
    const spy = spyOn(transactionService, 'deleteTransaction')
      .and
      .returnValue(new Observable<any>());
    deleteTransactionComponent.onSubmit();
    expect(transactionService.deleteTransaction).toHaveBeenCalledTimes(1);
  });
});
