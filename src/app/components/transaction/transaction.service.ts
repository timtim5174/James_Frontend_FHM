import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Transaction } from './transaction';
import { SharedTransactionService } from './shared-transaction.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseURL = 'http://localhost:8080' + '/JamesBackend-web/api/v1/boarding';
  private options = { withCredentials: true };
  response: object;


  constructor(private http: HttpClient, private sharedTransactionService: SharedTransactionService) { }

  createTransaction(transaction: Partial<Transaction>): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseURL + '/createTransaction', transaction, this.options).pipe(
      catchError(this.handleError)
    );
  }

  getTransactions(id: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseURL + `/getTransactions/${id}`, this.options).pipe(
      map(transactions => transactions.sort(((a: Transaction, b: Transaction) => a.creationDate <= b.creationDate ? 0 : 1))),
      map(data => this.response = data),
      catchError(this.handleError)
    );
  }

  updateTransaction(transaction: Partial<Transaction>) {
    return this.http.patch<Partial<Transaction>>(this.baseURL + '/updateTransaction', transaction, this.options).pipe(
      catchError(this.handleError)
    );
  }

  deleteTransaction(id: string, bid: string): Observable<any> {
    return this.http.delete<Transaction>(this.baseURL + `/deleteTransaction/${id}&${bid}`, this.options).pipe(
      catchError(this.handleError)
    );
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
