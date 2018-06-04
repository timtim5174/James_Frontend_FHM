import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SharedBookService } from '../shared-book.service';
import { Book } from '../book';
import { Chart } from 'chart.js';
import { TransactionService } from '../../transaction/transaction.service';

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
  axisLables: String[];
  pointLable = 'Amount';
  data = [];
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
  transactions = [];


  constructor(private sharedBookService: SharedBookService, private transactionService: TransactionService) {}

  ngOnInit() {
    this.sharedBookService.getBookData().subscribe( book => {
      if (book != null) {
        this.book = book;
      }
      this.transactionService.getTransactions(this.book.id).subscribe( transactions => {
        this.transactions = transactions;
        this.axisLables = new Array(transactions.length);
        for (let i = 0; i < transactions.length; i++) {
          // tslint:disable-next-line:max-line-length
          this.axisLables[i] = new Date(transactions[i].creationDate).getDate() + '.' + (new Date(transactions[i].creationDate).getMonth() + 1);
          this.data[i] = transactions[i].amount;
        }
      });
    });
  }


}
