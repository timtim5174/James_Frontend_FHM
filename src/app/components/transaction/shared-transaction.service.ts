import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class SharedTransactionService {
  transactions = new BehaviorSubject<Transaction[]>(null);

  constructor() { }

  setTransactions(transactions: Transaction[]) {
    transactions = transactions.sort(((a: Transaction, b: Transaction) =>
      (new Date(a.timeFrame).getTime()) - (new Date(b.timeFrame).getTime())));
    this.transactions.next(transactions);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.transactions.asObservable();
  }
}
