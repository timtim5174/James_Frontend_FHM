import { Injectable } from '@angular/core';
import { Transaction } from './transaction';
import { Book } from '../book/book';
import { TimeService } from '../book/book-time.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionTimeService {

  constructor(private bookTimeService: TimeService) { }

  isTransactionInCurrentBookPeriod(transaction: Transaction, book: Book): boolean {
    const bookPeriod = this.bookTimeService.getCurrentBookPeriod(book);
    const timeFrame = new Date(transaction.timeFrame);
    if (timeFrame.getTime() >= bookPeriod.startDate.getTime() &&
      timeFrame.getTime() <= bookPeriod.endDate.getTime()) {
      return true;
    } else {
      return false;
    }
  }
}
