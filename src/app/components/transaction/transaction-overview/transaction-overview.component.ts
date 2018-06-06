import { Component, OnInit, Input } from '@angular/core';
import { SharedBookService } from '../../book/shared-book.service';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../book/book';
import { SharedTransactionService } from '../shared-transaction.service';
import { Subscription } from 'rxjs';
import { CreateTransactionComponent } from '../create-transaction/create-transaction.component';
import { SharedCategoryService } from '../../category/shared-category.service';
import { Category } from '../../category/category';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-transaction-overview',
  templateUrl: './transaction-overview.component.html',
  styleUrls: ['./transaction-overview.component.scss']
})
export class TransactionOverviewComponent implements OnInit {
  @Input() transactions: Transaction[] = [];
  @Input() categorys: Category[];
  book: Book;
  createTransactionComponent = CreateTransactionComponent;

  constructor(
    private sharedBookService: SharedBookService,
    private sharedTransactionService: SharedTransactionService,
    private transactionService: TransactionService,
    private sharedCategoryService: SharedCategoryService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sharedCategoryService.getCategorys().subscribe(categorys => {
      this.categorys = categorys;
    });
    this.sharedTransactionService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
    });
  }

  addTransaction(transaction: Transaction) {
    this.sharedTransactionService.setTransactions([...this.transactions, transaction]);
  }

  deleteTransaction(transaction: Transaction) {
    this.transactionService.deleteTransaction(transaction.id, transaction.bookId).subscribe();
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

}
