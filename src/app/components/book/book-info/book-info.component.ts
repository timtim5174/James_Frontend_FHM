import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SharedBookService } from '../shared-book.service';
import { Book } from '../book';
import { Chart } from 'chart.js';
import { TransactionsService } from '../../transaction/transactions.service';
import { Transaction } from '../../transaction/transaction';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent implements OnInit {

  book: Book = {
    id: '',
    title: '',
    creationDate: null,
    timeFrame: null,
    rangeEnum: null
  };
  // Preparing Dataset for Graph
  type = 'line';
  axisLables = [];
  pointLable = 'Amount';
  data = [12, 19, 3, 5, -6, 3];
  backgroundColor = 'rgba(0, 0, 255, 0.3)';
  borderColor = 'rgba(0, 0, 255, 0.9)';
  fill = true;

  dataset = [{
    label: this.pointLable,
    data: this.data,
    fill: this.fill,
    backgroundColor : this.backgroundColor,
    borderColor: this.borderColor
  }];
  chart = [];
  transactions: Transaction[];


  constructor(private sharedBookService: SharedBookService, private transactionsService: TransactionsService) {}

  ngOnInit() {
    this.sharedBookService.getBookData().subscribe( book => {
      this.transactionsService.getTransactions(book.id).subscribe( transactions => {
        this.transactions = transactions;
        for (const t of transactions) {
          console.log(t.title + t.creationDate);
        }
      });

      if (book != null) {
      this.book = book;
      this.axisLables = [this.book.title, this.book.title, this.book.title, 'Green', 'Purple', 'Orange'];
      }
    });
  }


}
