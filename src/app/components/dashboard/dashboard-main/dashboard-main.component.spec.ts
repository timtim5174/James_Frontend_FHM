import { DashboardMainComponent } from './dashboard-main.component';
import { UserService } from '../../user/user.service';
import { BookService } from '../../book/book.service';
import { TransactionService } from '../../transaction/transaction.service';
import { SharedSidebarService } from '../../sidebar/shared-sidebar.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SharedUserService } from '../../user/shared-user.service';
import { Http } from '@angular/http';
import { SharedTransactionService } from '../../transaction/shared-transaction.service';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { Transaction } from '../../transaction/transaction';
import { BookInfo } from '../../book/book';

describe('DashboardMainComponent', () => {
  let dashboardMainComponent: DashboardMainComponent;
  let userService: UserService;
  let bookService: BookService;
  let transactionService: TransactionService;
  let sharedSidebarService: SharedSidebarService;
  let dateService: NgbDatepickerI18n; // tslint:disable-line

  beforeAll(() => {
    userService = new UserService(new HttpClient({} as HttpHandler), new SharedUserService());
    bookService = new BookService(new HttpClient({} as HttpHandler));
    transactionService = new TransactionService(new HttpClient({} as HttpHandler), new SharedTransactionService());
    sharedSidebarService = new SharedSidebarService();
    dashboardMainComponent = new DashboardMainComponent(userService, bookService, transactionService, dateService, sharedSidebarService);
  });

  it('should give correct book totals', async () => {
      const transaction: Transaction[] = [];
      transaction.push({id: '1', title: 'Incomes 1', comment: 'Incomes 1', bookId: '1', categoryId: '1', amount: 50,
      timeFrame: new Date(), rangeEnum: null, creationDate: new Date()});
      transaction.push({id: '2', title: 'Incomes 2', comment: 'Incomes 2', bookId: '1', categoryId: '1', amount: 70,
      timeFrame: new Date(), rangeEnum: null, creationDate: new Date()});
      transaction.push({id: '3', title: 'Outgoing 1', comment: 'Outgoing 1', bookId: '1', categoryId: '1', amount: -30,
      timeFrame: new Date(), rangeEnum: null, creationDate: new Date()});
      transaction.push({id: '4', title: 'Outgoing 2', comment: 'Outgoing 2', bookId: '1', categoryId: '1', amount: -20,
      timeFrame: new Date(), rangeEnum: null, creationDate: new Date()});
      transaction.push({id: '5', title: 'Outgoing 3', comment: 'Outgoing 3', bookId: '1', categoryId: '1', amount: -20,
      timeFrame: new Date(), rangeEnum: null, creationDate: new Date(new Date().setFullYear(2000))});

      const incomes = await dashboardMainComponent.getBookTotals(transaction, 'incomes', new Date().getMonth() + 1,
      new Date().getFullYear());
      const outgoings = await dashboardMainComponent.getBookTotals(transaction, 'outgoings', new Date().getMonth() + 1,
      new Date().getFullYear());
      expect(incomes).toBe(120);
      expect(outgoings).toBe(-50);
  });

  it('should give correct books totals', async () => {
      const books: BookInfo[] = [];
      books.push({bookName: 'Test 1', members: 1, incomes: 1000, outgoings: -100, users: [{
        id: '1', firstname: 'Harry', lastname: 'Hacker'
      }]});
      books.push({bookName: 'Test 2', members: 1, incomes: 2000, outgoings: -200, users: [{
        id: '2', firstname: 'John', lastname: 'Doe'
      }]});
      const incomes = await dashboardMainComponent.getBooksTotals(books, 'incomes');
      const outgoings = await dashboardMainComponent.getBooksTotals(books, 'outgoings');
      expect(incomes).toBe(3000);
      expect(outgoings).toBe(-300);
  });

  it('should give correct rate of book totals', async () => {
    const books: BookInfo[] = [];
    books.push({bookName: 'Test 1', members: 1, incomes: 1000, outgoings: -100, users: [{
      id: '1', firstname: 'Harry', lastname: 'Hacker'
    }]});
    books.push({bookName: 'Test 2', members: 1, incomes: 2000, outgoings: -200, users: [{
      id: '2', firstname: 'John', lastname: 'Doe'
    }]});
    const rateOfIncomes = await dashboardMainComponent.getBookRateOfTotals(books[0], 3000, 'incomes');
    const rateOfOutgoings = await dashboardMainComponent.getBookRateOfTotals(books[0], -300, 'outgoings');
    expect(rateOfIncomes).toBeGreaterThanOrEqual(33.3);
    expect(rateOfOutgoings).toBeGreaterThanOrEqual(33.3);
  });
});
