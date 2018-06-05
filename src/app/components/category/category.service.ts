import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Category } from './category';
import { Transaction } from '../transaction/transaction';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseURL = window.location.origin + '/JamesBackend-web/api/v1/boarding';
  private options = { withCredentials: true };
  private response = {};

  constructor(private http: HttpClient) { }

  public getBookCategories(id: string): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseURL + `/getBookCategories/${id}`).pipe(
      map(data => this.response = data),
      catchError(this.handleError)
    );
  }

  public getTransactionCategory(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(this.baseURL + `/getTransactionCategory/${id}`).pipe(
      map(data => this.response = data),
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
