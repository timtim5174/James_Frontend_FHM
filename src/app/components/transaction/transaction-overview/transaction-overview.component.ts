import { Component, OnInit, Input } from '@angular/core';
import { SharedBookService } from '../../book/shared-book.service';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../book/book';
import { SharedTransactionService } from '../shared-transaction.service';
import { Subscription } from 'rxjs';
import { CreateTransactionComponent } from '../create-transaction/create-transaction.component';

@Component({
  selector: 'app-transaction-overview',
  templateUrl: './transaction-overview.component.html',
  styleUrls: ['./transaction-overview.component.scss']
})
export class TransactionOverviewComponent implements OnInit {
  transactions: Transaction[] = [];
  book: Book;
  createTransactionComponent = CreateTransactionComponent;

  constructor(private sharedBookService: SharedBookService, private sharedTransactionService: SharedTransactionService,
    private transactionService: TransactionService, private route: ActivatedRoute) { }

  ngOnInit() {
      this.sharedTransactionService.getTransactions().subscribe(data => {
        this.transactions = data;
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
}
