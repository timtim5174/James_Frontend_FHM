import { Component, OnInit, Input } from '@angular/core';
import { SharedBookService } from '../../book/shared-book.service';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../book/book';
import { SharedTransactionService } from '../shared-transaction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction-overview',
  templateUrl: './transaction-overview.component.html',
  styleUrls: ['./transaction-overview.component.scss']
})
export class TransactionOverviewComponent implements OnInit {
  transactions: Transaction[] = [];
  book: Book;
  constructor(private sharedBookService: SharedBookService, private sharedTransactionService: SharedTransactionService,
    private transactionService: TransactionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sharedBookService.getBookData().subscribe(book => {
      this.book = book;
    });

    this.transactionService.getTransactions(this.book.id).subscribe(
      transactions => {
        this.sharedTransactionService.setTransactions(transactions);
        this.sharedTransactionService.getTransactions().subscribe(data => {
          this.transactions = data;
        });
    });
  }

  createTransaction() {
    const transaction: Transaction = {
      id: null,
      title: 'Test Transaction',
      comment: 'Test Comment',
      bookId: this.book.id,
      categoryId: '1',
      amount: 250.50,
      creationDate: null,
      timeFrame: new Date(2019, 0, 1, 0, 0, 0, 0),
      rangeEnum: 'DAILY'
    };
    this.transactionService.createTransaction(transaction).subscribe(
      data => {
        this.sharedTransactionService.setTransactions([...this.transactions, data]);
      }
    );
  }

  deleteTransaction(transaction: Transaction) {
    this.transactionService.deleteTransaction(transaction.id, transaction.bookId).subscribe();
    this.transactions = this.transactions.filter(t => t.id !== transaction.id);
    this.sharedTransactionService.setTransactions(this.transactions);
  }
}
