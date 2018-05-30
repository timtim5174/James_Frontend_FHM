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
  iMembers: number[] = [];

  constructor(private userService: UserService, private bookService: BookService, private transactionService: TransactionsService) { }

  ngOnInit() {
    this.loadBooksData();
  }

  async loadBooksData() {
    const books = await this.bookService.getBooks().toPromise();
    books.forEach(async book => {
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
        outgoings: tOutgoings
      });
    });
  }
  async loadBooksUserData(book: Book) {
    const users = await this.userService.getUsersOfBook(book.id).toPromise();
    const usersOfBook: UserInfo[] = [];
    users.forEach(user => {
      usersOfBook.push({ id: user.id, firstname: user.firstname, lastname: user.lastname });
    });
    return usersOfBook;
  }

  async getBookTotals(transaction: Transaction[], type: 'incomes' | 'outgoings') {
    let totals: number [] = [];
    let total = 0;

    // filter transaction on current month, incomes and outgoings, summarize values
    transaction = await transaction.filter(async t => {
      const tmp = new Date(t.creationDate).getMonth() + 1;
      if (tmp === new Date().getMonth() + 1) {
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
