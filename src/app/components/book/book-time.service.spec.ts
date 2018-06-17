import { TestBed, inject } from '@angular/core/testing';

import { TimeService } from './book-time.service';
import { Book, BookPeriod } from './book';


describe('TimeService', () => {
  const getTestData = function (param: Book) {
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
          endMonthlyDate = new Date(new Date().setDate(daysInMonth(new Date().getMonth(), new Date().getFullYear())));
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
  };

  const daysInMonth = function (month: number, year: number) {
    return 32 - new Date(year, month, 32).getDate();
  };

  let book: Book;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeService]
    });
    book = {
      title: 'Privat',
      id: null,
      creationDate: null,
      timeFrame: new Date(2018, 0, 1, 20, 0, 0),
      rangeEnum: 'DAILY'
    };
  });


  describe('#getCurrentBookPeriod', () => {
    it('should return the current day', inject([TimeService], (service: TimeService) => {
      const testDate: BookPeriod = {
        startDate: new Date(),
        endDate: new Date()
      };
      const resultStartDate = service.getCurrentBookPeriod(book).startDate.getTime() === testDate.startDate.getTime() ? true : false;
      const resultEndDate = service.getCurrentBookPeriod(book).endDate.getTime() === testDate.endDate.getTime() ? true : false;
      const result = resultStartDate === resultEndDate ? true : false;
      expect(result).toBe(true);

    }));

    it('should return the current day', inject([TimeService], (service: TimeService) => {
      book.rangeEnum = 'WEEKLY';
      const testDate = getTestData(book);
      const resultStartDate = service.getCurrentBookPeriod(book).startDate.getTime() === testDate.startDate.getTime() ? true : false;
      const resultEndDate = service.getCurrentBookPeriod(book).endDate.getTime() === testDate.endDate.getTime() ? true : false;
      const result = resultStartDate === resultEndDate ? true : false;
      expect(result).toBe(true);

    }));

    it('should return the current week - starting tuesday', inject([TimeService], (service: TimeService) => {
      book.rangeEnum = 'WEEKLY';
      book.timeFrame = new Date(2018, 0, 2, 20, 0, 0);
      const testDate = getTestData(book);
      const resultStartDate = service.getCurrentBookPeriod(book).startDate.getTime() === testDate.startDate.getTime() ? true : false;
      const resultEndDate = service.getCurrentBookPeriod(book).endDate.getTime() === testDate.endDate.getTime() ? true : false;
      const result = resultStartDate === resultEndDate ? true : false;
      expect(result).toBe(true);

    }));

    it('should return the current week - starting wednesday', inject([TimeService], (service: TimeService) => {
      book.rangeEnum = 'WEEKLY';
      book.timeFrame = new Date(2018, 1, 28, 20, 0, 0);
      const testDate = getTestData(book);
      const resultStartDate = service.getCurrentBookPeriod(book).startDate.getTime() === testDate.startDate.getTime() ? true : false;
      const resultEndDate = service.getCurrentBookPeriod(book).endDate.getTime() === testDate.endDate.getTime() ? true : false;
      const result = resultStartDate === resultEndDate ? true : false;
      expect(result).toBe(true);

    }));

    it('should return the current week - starting thursday', inject([TimeService], (service: TimeService) => {
      book.rangeEnum = 'WEEKLY';
      book.timeFrame = new Date(2018, 7, 16, 20, 0, 0);
      const testDate = getTestData(book);
      const resultStartDate = service.getCurrentBookPeriod(book).startDate.getTime() === testDate.startDate.getTime() ? true : false;
      const resultEndDate = service.getCurrentBookPeriod(book).endDate.getTime() === testDate.endDate.getTime() ? true : false;
      const result = resultStartDate === resultEndDate ? true : false;
      expect(result).toBe(true);

    }));

    it('should return the current month - starting the first day of the month', inject([TimeService], (service: TimeService) => {
      book.rangeEnum = 'MONTHLY';
      const testDate = getTestData(book);
      const resultStartDate = service.getCurrentBookPeriod(book).startDate.getTime() === testDate.startDate.getTime() ? true : false;
      const resultEndDate = service.getCurrentBookPeriod(book).endDate.getTime() === testDate.endDate.getTime() ? true : false;
      const result = resultStartDate === resultEndDate ? true : false;
      expect(result).toBe(true);

    }));

    it('should return the current month - starting the 15th of the month', inject([TimeService], (service: TimeService) => {
      book.rangeEnum = 'MONTHLY';
      book.timeFrame = new Date(2018, 1, 15, 20, 0, 0);
      const testDate = getTestData(book);
      const resultStartDate = service.getCurrentBookPeriod(book).startDate.getTime() === testDate.startDate.getTime() ? true : false;
      const resultEndDate = service.getCurrentBookPeriod(book).endDate.getTime() === testDate.endDate.getTime() ? true : false;
      const result = resultStartDate === resultEndDate ? true : false;
      expect(result).toBe(true);

    }));

    it('should return the current month - starting the 28th of the month', inject([TimeService], (service: TimeService) => {
      book.rangeEnum = 'MONTHLY';
      book.timeFrame = new Date(2018, 1, 28, 20, 0, 0);
      const testDate = getTestData(book);
      const resultStartDate = service.getCurrentBookPeriod(book).startDate.getTime() === testDate.startDate.getTime() ? true : false;
      const resultEndDate = service.getCurrentBookPeriod(book).endDate.getTime() === testDate.endDate.getTime() ? true : false;
      const result = resultStartDate === resultEndDate ? true : false;
      expect(result).toBe(true);

    }));

    it('should return the current month - starting the 10th of the month', inject([TimeService], (service: TimeService) => {
      book.rangeEnum = 'MONTHLY';
      book.timeFrame = new Date(2018, 11, 10, 20, 0, 0);
      const testDate = getTestData(book);
      const resultStartDate = service.getCurrentBookPeriod(book).startDate.getTime() === testDate.startDate.getTime() ? true : false;
      const resultEndDate = service.getCurrentBookPeriod(book).endDate.getTime() === testDate.endDate.getTime() ? true : false;
      const result = resultStartDate === resultEndDate ? true : false;
      expect(result).toBe(true);

    }));

    it('should return the current month - starting the 31th of the month', inject([TimeService], (service: TimeService) => {
      book.rangeEnum = 'MONTHLY';
      book.timeFrame = new Date(2018, 11, 31, 20, 0, 0);
      const testDate = getTestData(book);
      const resultStartDate = service.getCurrentBookPeriod(book).startDate.getTime() === testDate.startDate.getTime() ? true : false;
      const resultEndDate = service.getCurrentBookPeriod(book).endDate.getTime() === testDate.endDate.getTime() ? true : false;
      const result = resultStartDate === resultEndDate ? true : false;
      expect(result).toBe(true);

    }));

    it('should return the current year - starting january 1st', inject([TimeService], (service: TimeService) => {
      book.rangeEnum = 'YEARLY';
      const testDate = getTestData(book);
      const resultStartDate = service.getCurrentBookPeriod(book).startDate.getTime() === testDate.startDate.getTime() ? true : false;
      const resultEndDate = service.getCurrentBookPeriod(book).endDate.getTime() === testDate.endDate.getTime() ? true : false;
      const result = resultStartDate === resultEndDate ? true : false;
      expect(result).toBe(true);

    }));

    it('should return the current year - starting january 15st', inject([TimeService], (service: TimeService) => {
      book.rangeEnum = 'YEARLY';
      book.timeFrame = new Date(2018, 0, 15, 20, 0, 0);
      const testDate = getTestData(book);
      const resultStartDate = service.getCurrentBookPeriod(book).startDate.getTime() === testDate.startDate.getTime() ? true : false;
      const resultEndDate = service.getCurrentBookPeriod(book).endDate.getTime() === testDate.endDate.getTime() ? true : false;
      const result = resultStartDate === resultEndDate ? true : false;
      expect(result).toBe(true);

    }));

    it('should return the current year - starting february 28th', inject([TimeService], (service: TimeService) => {
      book.rangeEnum = 'YEARLY';
      book.timeFrame = new Date(2018, 1, 28, 20, 0, 0);
      const testDate = getTestData(book);
      const resultStartDate = service.getCurrentBookPeriod(book).startDate.getTime() === testDate.startDate.getTime() ? true : false;
      const resultEndDate = service.getCurrentBookPeriod(book).endDate.getTime() === testDate.endDate.getTime() ? true : false;
      const result = resultStartDate === resultEndDate ? true : false;
      expect(result).toBe(true);

    }));

    it('should return the current year - starting march 1st', inject([TimeService], (service: TimeService) => {
      book.rangeEnum = 'YEARLY';
      book.timeFrame = new Date(2018, 2, 1, 20, 0, 0);
      const testDate = getTestData(book);
      const resultStartDate = service.getCurrentBookPeriod(book).startDate.getTime() === testDate.startDate.getTime() ? true : false;
      const resultEndDate = service.getCurrentBookPeriod(book).endDate.getTime() === testDate.endDate.getTime() ? true : false;
      const result = resultStartDate === resultEndDate ? true : false;
      expect(result).toBe(true);

    }));

    it('should return the current year - starting august 20th', inject([TimeService], (service: TimeService) => {
      book.rangeEnum = 'YEARLY';
      book.timeFrame = new Date(2018, 7, 20, 20, 0, 0);
      const testDate = getTestData(book);
      const resultStartDate = service.getCurrentBookPeriod(book).startDate.getTime() === testDate.startDate.getTime() ? true : false;
      const resultEndDate = service.getCurrentBookPeriod(book).endDate.getTime() === testDate.endDate.getTime() ? true : false;
      const result = resultStartDate === resultEndDate ? true : false;
      expect(result).toBe(true);

    }));

    it('should return the current year - starting december 31th', inject([TimeService], (service: TimeService) => {
      book.rangeEnum = 'YEARLY';
      book.timeFrame = new Date(2018, 11, 31, 20, 0, 0);
      const testDate = getTestData(book);
      const resultStartDate = service.getCurrentBookPeriod(book).startDate.getTime() === testDate.startDate.getTime() ? true : false;
      const resultEndDate = service.getCurrentBookPeriod(book).endDate.getTime() === testDate.endDate.getTime() ? true : false;
      const result = resultStartDate === resultEndDate ? true : false;
      expect(result).toBe(true);

    }));
  });
});
