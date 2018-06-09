import { BookService } from './book.service';
import { Book } from './book';

xdescribe('BookService', () => {
  beforeEach(() => {

  });
  beforeAll(() => {
    const bookService = new BookService(null);
  });

  xdescribe('#getCurrentBookPeriod', () => {
    it('should return love', () => {
      const book: Book = {
        title: 'Privat',
        id: null,
        creationDate: null,
        timeFrame: new Date(2018, 0, 1, 20, 0, 0),
        rangeEnum: 'DAILY'
      };
      expect(this.bookService.getCurrentBookPeriod(book)).toBeTruthy();
    });
  });



});

