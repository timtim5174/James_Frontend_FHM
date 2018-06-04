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

  setTransactions(transaction: Transaction[]) {
    this.transactions.next(transaction);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.transactions.asObservable();
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    let msg: string;
    if (error.error) {
      msg = error.error;
    } else if (error.message) {
      msg = error.message;
    } else {
      msg = `${error.status} - ${error.statusText || ''}`;
    }
    return throwError(msg);
  }
}
