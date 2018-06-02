import { Component, OnInit, Input } from '@angular/core';
import { SharedBookService } from '../../book/shared-book.service';
import { Transaction } from '../transaction';
import { TransactionsService } from '../transactions.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../book/book';

@Component({
  selector: 'app-transaction-overview',
  templateUrl: './transaction-overview.component.html',
  styleUrls: ['./transaction-overview.component.scss']
})
export class TransactionOverviewComponent implements OnInit {
  transactions: Transaction[];
  book: Book;
  constructor(private sharedBookService: SharedBookService, private transactionsService: TransactionsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sharedBookService.getBookData().subscribe(book => {
      this.book = book;
    });

    console.log('book id: ', this.book.id);
    this.transactionsService.getTransactions(this.book.id).subscribe(transaction => {
      this.transactions = transaction;
      console.log('transactions: ', this.transactions);
    });

  }

  createTransaction() {
    const transaction: Transaction = {
      id: 'jhgfds',
      title: 'Test Transaction',
      comment: 'Test Comment',
      bookId: this.book.id,
      categoryId: 'catId',
      amount: 250.50,
      creationDate: null,
      timeFrame: new Date(2018, 10, 10),
      rangeEnum: 'DAILY'
    };

    this.transactions.push(transaction);

    this.transactionsService.createTransaction(transaction);
  }

}
