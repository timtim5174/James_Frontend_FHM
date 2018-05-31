import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../components/user/user.service';
import { User, UserInfo } from '../../../components/user/user';
import { BookService } from '../../book/book.service';
import { SharedBookService } from '../../book/shared-book.service';
import { BookInfo, Book } from '../../book/book';
import { TransactionsService } from '../../transaction/transactions.service';
import { Transaction } from '../../transaction/transaction';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {
  booksInfo: BookInfo[] = [];
  month = 'May';
  totalIncomes = 0;
  totalOutgoings = 0;
  userHasBooks = true;
  noBooksMessage = 'No books available';

  constructor(private userService: UserService, private bookService: BookService, private transactionService: TransactionsService) { }

  ngOnInit() {
    this.loadBooksData();
  }

  async loadBooksData() {
    const books = await this.bookService.getBooks().toPromise();
    if (books.length > 0) {
      await books.forEach(async book => {
        let usersOfBook: UserInfo[] = [];
        let tOutgoings = 0;
        let tIncomes = 0;

        usersOfBook = await this.loadBooksUserData(book);
        const transaction = await this.transactionService.getTransactions(book.id).toPromise();
        tIncomes = await this.getBookTotals(transaction, 'incomes');
        tOutgoings = await this.getBookTotals(transaction, 'outgoings');

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
      return Math.round((100 * bookInfo.incomes) / ofTotals);
    }
    if (type === 'outgoings') {
      return Math.round((100 * bookInfo.outgoings) / ofTotals);
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

  async getBookTotals(transaction: Transaction[], type: 'incomes' | 'outgoings', inMonth?: number): Promise<number> {
    let totals: number[] = [];
    let total = 0;
    const month = inMonth ? inMonth : new Date().getMonth() + 1;
    // filter transaction on current month, incomes and outgoings, summarize values
    transaction = await transaction.filter(async t => {
      const tmp = new Date(t.creationDate).getMonth() + 1;
      if (tmp === month) {
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
