import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../../../components/user/user.service';
import { UserInfo } from '../../../components/user/user';
import { BookService } from '../../book/book.service';

import { BookInfo, Book } from '../../book/book';
import { TransactionService } from '../../transaction/transaction.service';
import { Transaction } from '../../transaction/transaction';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { SharedSidebarService } from '../../sidebar/shared-sidebar.service';



@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {
  booksInfo: BookInfo[] = [];
  months: string[] = [];
  years: string[] = ['2018'];
  monthTitle = '';
  totalIncomes = 0;
  totalOutgoings = 0;
  userHasBooks = true;
  noBooksMessage = 'No books available';
  filterYear = new Date().getFullYear(); // start values
  filterMonth = new Date().getMonth() + 1; // start values

  constructor(private userService: UserService, private bookService: BookService,
    private transactionService: TransactionService, private dateService: NgbDatepickerI18n,
    private sharedSidebarService: SharedSidebarService) { }

  ngOnInit() {
    setTimeout(() => this.sharedSidebarService.selectedIcon = 'dashboard');
    this.monthTitle = this.dateService.getMonthFullName(this.filterMonth) + ' ' + this.filterYear;
    this.setMonths();
    this.loadBooksData(this.filterMonth, this.filterYear);
  }


  setMonths() {
    for (let i = 1; i <= 12; i++) {
      this.months.push(this.dateService.getMonthFullName(i));
    }
  }

  setFilterYear(event) {
    const year = event.target.textContent;
    this.filterYear = year;
    this.reloadData();
  }

  setFilterMonth(event) {
    const month = event.target.textContent;
    this.filterMonth = this.months.indexOf(month) + 1;
    this.reloadData();
  }

  reloadData() {
    this.booksInfo = [];
    this.loadBooksData(this.filterMonth, this.filterYear);
    this.monthTitle = this.dateService.getMonthFullName(this.filterMonth) + ' ' + this.filterYear;
  }


  async loadBooksData(inMonth: number, inYear: number) {
    const books = await this.bookService.getBooks().toPromise();
    if (books.length > 0) {
      await books.forEach(async book => {
        let usersOfBook: UserInfo[] = [];
        let tOutgoings = 0;
        let tIncomes = 0;

        usersOfBook = await this.loadBooksUserData(book);
        const transaction = await this.transactionService.getTransactions(book.id).toPromise();
        tIncomes = await this.getBookTotals(transaction, 'incomes', inMonth, inYear);
        tOutgoings = await this.getBookTotals(transaction, 'outgoings', inMonth, inYear);

        await this.booksInfo.push({
          bookName: book.title,
          members: usersOfBook.length,
          users: usersOfBook,
          incomes: tIncomes,
          outgoings: tOutgoings,
        });
        this.totalIncomes = await this.getBooksTotals(this.booksInfo, 'incomes');
        this.totalOutgoings = await this.getBooksTotals(this.booksInfo, 'outgoings');
        await this.loadBookRateOfTotalsData();
      });
    } else {
      this.userHasBooks = false;
    }
  }

  async loadBookRateOfTotalsData() {
    this.booksInfo.forEach(async book => {
      book.rateOfIncomes = await this.getBookRateOfTotals(book, this.totalIncomes, 'incomes');
      book.rateOfOutgoings = await this.getBookRateOfTotals(book, this.totalOutgoings, 'outgoings');
    });
  }

  async loadBooksUserData(book: Book): Promise<UserInfo[]> {
    const users = await this.userService.getUsersOfBook(book.id).toPromise();
    const usersOfBook: UserInfo[] = [];
    users.forEach(user => {
      usersOfBook.push({ id: user.id, firstname: user.firstname, lastname: user.lastname });
    });
    return usersOfBook;
  }


  // possible to export in shared service?
  async getBookRateOfTotals(bookInfo: BookInfo, ofTotals: number, type: 'incomes' | 'outgoings'): Promise<number> {
    if (type === 'incomes') {
      return ofTotals === 0 ? 0 : (Math.round(((100 * bookInfo.incomes) / ofTotals) * 100) / 100);
    }
    if (type === 'outgoings') {
      return ofTotals === 0 ? 0 : (Math.round(((100 * bookInfo.outgoings) / ofTotals) * 100) / 100);
    }
  }

  async getBooksTotals(books: BookInfo[], type: 'incomes' | 'outgoings'): Promise<number> {
    let total = 0;
    if (type === 'incomes') {
      books.forEach(book => {
        total += book.incomes;
      });
    }
    if (type === 'outgoings') {
      books.forEach(book => {
        total += book.outgoings;
      });
    }
    return total;
  }

  async getBookTotals(transaction: Transaction[], type: 'incomes' | 'outgoings', inMonth?: number, inYear?: number): Promise<number> {
    let totals: number[] = [];
    let total = 0;
    const month = inMonth ? inMonth : new Date().getMonth() + 1;
    const year = inYear ? inYear : new Date().getFullYear();

    // filter transaction on current month and year or to given month and year, incomes and outgoings, summarize values
    transaction = await transaction.filter(t => {
      const tmpMonth = new Date(t.creationDate).getMonth() + 1;
      const tmpYear = new Date(t.creationDate).getFullYear();
      if (tmpMonth === month && tmpYear === year) {
        return true;
      }
      return false;
    });

    if (type === 'incomes') {
      totals = await transaction.filter(t => t.amount > 0).map(x => x.amount = x.amount);
      if (totals.length > 0) { total = totals.reduce((t, value) => t + value); }
    }
    if (type === 'outgoings') {
      totals = await transaction.filter(t => t.amount < 0).map(x => x.amount = x.amount);
      if (totals.length > 0) { total = totals.reduce((t, value) => t + value); }
    }
    return total;
  }
}
