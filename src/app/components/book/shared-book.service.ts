import { Injectable } from '@angular/core';
import { Observable, of, throwError as _throw, BehaviorSubject } from 'rxjs';
import { Book } from '../book/book';

@Injectable({
  providedIn: 'root'
})
export class SharedBookService {
  bookSelectedIdSubject = new BehaviorSubject<String>(null);
  bookArrayDataSubject = new BehaviorSubject<Book[]>(null);
  updateDeleteBookSubject = new BehaviorSubject<Book>(null);

  constructor() { }

  setSelectedIdBook(s: String) {
    this.bookSelectedIdSubject.next(s);
  }

  getSelectedIdBook(): Observable<String> {
    return this.bookSelectedIdSubject.asObservable();
  }

  setArrayData(a: Book[]) {
    this.bookArrayDataSubject.next(a);
  }

  getArrayData(): Observable<Book[]> {
    return this.bookArrayDataSubject.asObservable();
  }

  setUpdateDeleteBookSubject(b: Book) {
    this.updateDeleteBookSubject.next(b);
  }

  getUpdateDeleteBookSubject(): Observable<Book> {
    return this.updateDeleteBookSubject.asObservable();
  }

}













