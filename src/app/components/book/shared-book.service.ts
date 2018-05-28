import { Injectable } from '@angular/core';
import { Observable, of, throwError as _throw, BehaviorSubject} from 'rxjs';
import {Book} from '../book/book';

@Injectable({
  providedIn: 'root'
})
export class BookDataService {
bookSubject = new BehaviorSubject<Book>(null);

  constructor() { }

  setBook(b: Book) {
    this.bookSubject.next(b);
  }

  getBook(): Observable<Book> {
    return this.bookSubject.asObservable();
  }
}
