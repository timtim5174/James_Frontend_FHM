import { Injectable } from '@angular/core';
import { Observable, of, throwError as _throw, BehaviorSubject } from 'rxjs';
import { Book } from '../book/book';

@Injectable({
  providedIn: 'root'
})
export class SharedBookService {
  bookSelectedIdSubject = new BehaviorSubject<string>(null);
  bookArrayDataSubject = new BehaviorSubject<Book[]>(null);
  bookDataSubject = new BehaviorSubject<Book>(null);
  updateDeleteBookSubject = new BehaviorSubject<Book>(null);

  constructor() { }

  setSelectedIdBook(s: string) {
    this.bookSelectedIdSubject.next(s);
  }

  getSelectedIdBook(): Observable<string> {
    return this.bookSelectedIdSubject.asObservable();
  }

  setBookArrayData(a: Book[]) {
    this.bookArrayDataSubject.next(a);
  }

  getBookArrayData(): Observable<Book[]> {
    return this.bookArrayDataSubject.asObservable();
  }

  setBookData(a: Book) {
    this.bookDataSubject.next(a);
  }

  getBookData(): Observable<Book> {
    return this.bookDataSubject.asObservable();
  }

  setUpdateDeleteBookSubject(b: Book) {
    this.updateDeleteBookSubject.next(b);
  }

  getUpdateDeleteBookSubject(): Observable<Book> {
    return this.updateDeleteBookSubject.asObservable();
  }

}













