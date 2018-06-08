import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError as _throw } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Book, BookPeriod } from './book';
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
    return this.http.post<Book>(this.baseURL + '/createBook', book).pipe(
      catchError(this.handleError)
    );
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete<Book>(this.baseURL + `/deleteCallerFromBook/${id}`).pipe(
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

  getCurrentBookPeriod(book: Book): BookPeriod {
    switch (book.rangeEnum) {
      case 'DAILY':
        return {
          startDate: new Date(),
          endDate: new Date()
        };
      case 'WEEKLY':
        const day = book.timeFrame.getDay();
        const currentDay = new Date().getDay();
        const tmp = day - currentDay <= 0 ? day - currentDay : day - currentDay - 7;
        const startDate = new Date(new Date().setDate(new Date().getDate() + tmp));
        const tmpDate = new Date(startDate);
        const endDate = new Date(tmpDate.setDate(tmpDate.getDate() + 6));
        return {
          startDate: startDate,
          endDate: endDate
        };
      case 'MONTHLY':
        const date = book.timeFrame.getDate();
        let startMonthlyDate: Date;
        let endMonthlyDate: Date;

        if (date > new Date().getDate()) {
          const temp = new Date(new Date().setMonth(new Date().getMonth() - 1));
          startMonthlyDate = new Date(temp.setDate(date));
        } else {
          startMonthlyDate = new Date(new Date().setDate(date));
        }

        if (date === 1) {
          endMonthlyDate = new Date(new Date().setDate(this.daysInMonth(new Date().getMonth(), new Date().getFullYear())));
        } else {
          const tempStartMonthlyDate = new Date(startMonthlyDate);
          const tmpMonthlyDate = new Date(tempStartMonthlyDate.setDate(date - 1));
          endMonthlyDate = new Date(tmpMonthlyDate.setMonth(tmpMonthlyDate.getMonth() + 1));
        }
        return {
          startDate: startMonthlyDate,
          endDate: endMonthlyDate
        };
      case 'YEARLY':
        const month = book.timeFrame.getMonth();
        const dateYearly = book.timeFrame.getDate();
        let startYearlyDate: Date;
        let endYearlyDate: Date;

        if (month > new Date().getMonth() || (month === new Date().getMonth() && dateYearly > new Date().getDate())) {
          const tempYearYearly = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
          startYearlyDate = new Date(tempYearYearly.setDate(dateYearly));
        } else {
          const tempMonthYearly = new Date(new Date().setMonth(month));
          startYearlyDate = new Date(tempMonthYearly.setDate(dateYearly));
        }
        const tempEndYearlyDate = new Date(startYearlyDate);
        const tmpABC = new Date(tempEndYearlyDate.setDate(tempEndYearlyDate.getDate() - 1));
        endYearlyDate = new Date(tmpABC.setFullYear(tmpABC.getFullYear() + 1));

        return {
          startDate: startYearlyDate,
          endDate: endYearlyDate
        };
      default:
        return null;
    }
  }

  private daysInMonth(month: number, year: number) {
    return 32 - new Date(year, month, 32).getDate();
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
