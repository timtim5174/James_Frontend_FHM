import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction';

import { Book } from '../../book/book';
import { SharedTransactionService } from '../shared-transaction.service';
import { CreateTransactionComponent } from '../create-transaction/create-transaction.component';
import { SharedCategoryService } from '../../category/shared-category.service';
import { Category } from '../../category/category';

import { UpdateTransactionComponent } from '../update-transaction/update-transaction.component';
import { DeleteTransactionComponent } from '../delete-transaction/delete-transaction.component';
import { UserInfo } from '../../user/user';
import { SharedUserService } from '../../user/shared-user.service';
import { SharedBookService } from '../../book/shared-book.service';
import { TransactionTimeService } from '../transaction-time.service';



@Component({
  selector: 'app-transaction-overview',
  templateUrl: './transaction-overview.component.html',
  styleUrls: ['./transaction-overview.component.scss']
})
export class TransactionOverviewComponent implements OnInit {
  transactions: Transaction[] = [];
  categorys: Category[];
  book: Book;
  userInfos: UserInfo[];

  createTransactionComponent = CreateTransactionComponent;
  updateTransactionComponent = UpdateTransactionComponent;
  deleteTransactionComponent = DeleteTransactionComponent;

  constructor(
    private sharedUserService: SharedUserService,
    private sharedTransactionService: SharedTransactionService,
    private sharedCategoryService: SharedCategoryService,
    private sharedBookService: SharedBookService,
    private transactionTimeService: TransactionTimeService) { }

  ngOnInit() {
    this.sharedCategoryService.getCategorys().subscribe(categorys => {
      this.categorys = categorys;
    });
    this.sharedTransactionService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
    });
    this.sharedUserService.getUserForBookSubject().subscribe(userInfos => {
      this.userInfos = userInfos;
    });
    this.sharedBookService.getBookData().subscribe(book =>
      this.book = book
    );

  }



  addTransaction(transaction: Transaction) {
    this.sharedTransactionService.setTransactions([...this.transactions, transaction]);
  }

  updateTransaction(transaction: Transaction) {
    this.transactions = this.transactions.filter(t => t.id !== transaction.id);
    this.sharedTransactionService.setTransactions([...this.transactions, transaction]);
  }

  deleteTransaction(transaction: Transaction) {
    this.transactions = this.transactions.filter(t => t.id !== transaction.id);
    this.sharedTransactionService.setTransactions(this.transactions);
  }

  getCategoryWithId(id: string): string {
    let cat: Category;
    let name = '';
    if (!this.categorys) {
      return name;
    } else {
      cat = this.categorys.find(value => {
        if (value.categoryId === id) {
          name = value.name;
          return true;
        } else {
          return false;
        }
      });
      return name;
    }
  }

  generateDate(date: Date): string {
    const day = new Date(date).getDate().toString();
    const month = (new Date(date).getMonth() + 1).toString();
    const year = new Date(date).getFullYear().toString();
    return day + '.' + month + '.' + year;
  }

    getTransactionCreator(transaction: Transaction) {
      if (this.userInfos) {
        for (const user of this.userInfos) {
          if (user.id === transaction.userId) {
            return user.firstname;
          }
        }
      } else {
        return '';
      }
    }

    isTransactionInCurrentBookPeriod(transaction: Transaction): boolean {
      return this.transactionTimeService.isTransactionInCurrentBookPeriod(transaction, this.book);
    }
}
