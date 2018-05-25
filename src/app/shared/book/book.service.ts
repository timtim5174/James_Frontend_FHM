import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError as _throw } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseURL = window.location.origin + '/JamesBackend-web/api/v1/boarding';
  private options = { withCredentials: true };

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseURL + '/getBooks', this.options).pipe(
      catchError(this.handleError)
    );
  }

  createBook(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(this.baseURL + '/createBook', book).pipe(
      catchError(this.handleError)
    );
  }

  deleteBook(book: Book): Observable<any> {
    return this.http.delete<Book>(this.baseURL + '/deleteBook').pipe(
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
