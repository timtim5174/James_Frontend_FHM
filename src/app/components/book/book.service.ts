import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError as _throw } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Book } from './book';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseURL = window.location.origin + '/JamesBackend-web/api/v1/boarding';
  private options = { withCredentials: true };

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseURL + '/getBooks').pipe(
      map(books => books.sort(((a: Book, b: Book) => a.title <= b.title ? 0 : 1))),
      catchError(this.handleError)
    );
  }

  createBook(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(this.baseURL + '/createBook', book).pipe(
      catchError(this.handleError)
    );
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete<Book>(this.baseURL + `/deleteBook/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateBook(book: Partial<Book>) {
    return this.http.patch<Partial<Book>>(this.baseURL + '/updateBook', book).pipe(
      catchError(this.handleError)
    );
  }

  addUserToBook(book: Book, user: Partial<User>) {
    const a = { bookId: book.id, email: user.email };
    return this.http.post(this.baseURL + '/addUserToBook', a).pipe(
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
