import { Component, OnInit } from '@angular/core';
import { BarGraph } from '../../../shared/graphs/bar-graph/bar-graph';
import { SharedBookService } from '../shared-book.service';
import { SharedTransactionService } from '../../transaction/shared-transaction.service';
import { Book } from '../book';
import { Transaction } from '../../transaction/transaction';

@Component({
  selector: 'app-book-statistics',
  templateUrl: './book-statistics.component.html',
  styleUrls: ['./book-statistics.component.scss']
})
export class BookStatisticsComponent implements OnInit {
  dataBarGraph: BarGraph;
  book: Book;
  transactions: Transaction[];

  constructor(private sharedBookService: SharedBookService, private sharedTransactionService: SharedTransactionService) { }

  ngOnInit() {
    this.sharedBookService.getBookData().subscribe(book => {
      if (book !== null && book !== this.book) {
        this.book = book;
      }
      this.sharedTransactionService.getTransactions().subscribe(transactions => {
        if (transactions !== null && transactions !== this.transactions) {
          this.transactions = transactions;
          this.barGraph();
        }
      });
    });
  }
  barGraph() {
    this.dataBarGraph = {
      type: 'bar',
      data: {
        labels: ['test1', 'test2', 'test3', 'test4', 'test5'],
        datasets: [
          {
            label: 'Einkunft',
            backgroundColor: ['rgba(23,162,184)'],
            data: [-100, 200, 300, 400, 500]
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        title: {
          display: true
        }
      }
    };
  }
}

