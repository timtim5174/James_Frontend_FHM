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
    this.transactions.next(transactions);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.transactions.asObservable();
  }

}
