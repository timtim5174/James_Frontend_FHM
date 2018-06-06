import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Transaction } from './transaction';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedTransactionService {
  transactions = new BehaviorSubject<Transaction[]>(null);

  constructor() { }

  setTransactions(transactions: Transaction[]) {
    // tslint:disable-next-line:max-line-length
    transactions = transactions.sort(((a: Transaction, b: Transaction) => (new Date(a.creationDate).getTime()) - (new Date(b.creationDate).getTime())));
    this.transactions.next(transactions);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.transactions.asObservable();
  }
}
