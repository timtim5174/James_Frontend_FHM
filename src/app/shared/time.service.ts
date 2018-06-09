import { Injectable } from '@angular/core';
import { Book, BookPeriod } from '../components/book/book';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }


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
}
