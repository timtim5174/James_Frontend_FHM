import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError as _throw } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private baseURL = window.location.origin + '/JamesBackend-web/api/v1/boarding';
  private options = { withCredentials: true };

  constructor(private http: HttpClient) { }

  createTransaction(transaction: Partial<Transaction>): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseURL + '/createTransaction', transaction).pipe(
      catchError(this.handleError)
    );
  }

  getTransactions(id: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseURL + `/getTransactions/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateTransaction(transaction: Partial<Transaction>) {
    return this.http.patch<Partial<Transaction>>(this.baseURL + '/updateTransaction', transaction).pipe(
      catchError(this.handleError)
    );
  }

  deleteTransaction(id: string): Observable<any> {
    return this.http.delete<Transaction>(this.baseURL + `/deleteTransaction/${id}`).pipe(
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
    return _throw(msg);
  }
}
