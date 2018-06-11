import { Injectable } from '@angular/core';
import { Book, BookPeriod } from './book';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }


  getCurrentBookPeriod(book: Book): BookPeriod {
    if (book.rangeEnum === 'DAILY') {
      return {
        startDate: new Date(),
        endDate: new Date()
      };
    }

    if (book.rangeEnum === 'WEEKLY') {
      const resetDay = book.timeFrame.getDay();
      const currentDay = new Date().getDay();
      const deviation = resetDay - currentDay <= 0 ? resetDay - currentDay : resetDay - currentDay - 7;
      const startDate = new Date(new Date().setDate(new Date().getDate() + deviation));
      const endDate = this.addDays(startDate, 6);
      return {
        startDate: startDate,
        endDate: endDate
      };
    }

    if (book.rangeEnum === 'MONTHLY') {
      const resetDate = book.timeFrame.getDate();
      let startDate: Date;
      let endDate: Date;

      if (resetDate > new Date().getDate()) {
        const temp = new Date(new Date().setMonth(new Date().getMonth() - 1));
        startDate = new Date(temp.setDate(resetDate));
      } else {
        startDate = new Date(new Date().setDate(resetDate));
      }

      if (resetDate === 1) {
        endDate = new Date(new Date().setDate(this.daysInMonth(new Date().getMonth(), new Date().getFullYear())));
      } else {
        const temp1 = new Date(startDate);
        const temp2 = new Date(temp1.setDate(resetDate - 1));
        endDate = new Date(temp2.setMonth(temp2.getMonth() + 1));
      }
      return {
        startDate: startDate,
        endDate: endDate
      };
    }

    if (book.rangeEnum === 'YEARLY') {
      const resetMonth = book.timeFrame.getMonth();
      const resetDate = book.timeFrame.getDate();
      let startDate: Date;
      let endDate: Date;

      if (resetMonth > new Date().getMonth() || (resetMonth === new Date().getMonth() && resetDate > new Date().getDate())) {
        const temp = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
        startDate = new Date(temp.setDate(resetDate));
      } else {
        const temp = new Date(new Date().setMonth(resetMonth));
        startDate = new Date(temp.setDate(resetDate));
      }
      const temp1 = new Date(startDate);
      const temp2 = new Date(temp1.setDate(temp1.getDate() - 1));
      endDate = new Date(temp2.setFullYear(temp2.getFullYear() + 1));

      return {
        startDate: startDate,
        endDate: endDate
      };
    }

    return null;
  }


  private daysInMonth(month: number, year: number) {
    return 32 - new Date(year, month, 32).getDate();
  }

  private addDays(oldDate: Date, days: number): Date {
    const tmp = new Date(oldDate.getTime());
    return new Date(tmp.setDate(tmp.getDate() + days));
  }
}
