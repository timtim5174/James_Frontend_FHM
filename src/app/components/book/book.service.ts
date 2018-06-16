import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError as _throw } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Book, BookPeriod } from './book';
import { User } from '../user/user';
import { RequestOptions } from '@angular/http';
import jamesConf from '../../../james.conf';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseURL = jamesConf.restApiUrl;
  private options = { withCredentials: true };

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseURL + '/getBooks', this.options).pipe(
      map(books => books.sort(((a: Book, b: Book) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        } else {
          return 0;
        }
      }))),
      catchError(this.handleError)
    );
  }

  createBook(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(this.baseURL + '/createBook', book, this.options).pipe(
      catchError(this.handleError)
    );
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete<Book>(this.baseURL + `/deleteCallerFromBook/${id}`, this.options).pipe(
      catchError(this.handleError)
    );
  }

  updateBook(book: Partial<Book>) {
    return this.http.patch<Partial<Book>>(this.baseURL + '/updateBook', book, this.options).pipe(
      catchError(this.handleError)
    );
  }

  addUserToBook(book: Book, user: Partial<User>) {
    const a = { bookId: book.id, email: user.email };
    return this.http.post(this.baseURL + '/addUserToBook', a, this.options).pipe(
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
