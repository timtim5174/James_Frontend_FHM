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
  axisLables = [];
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


  constructor(private sharedBookService: SharedBookService, private transactionService: TransactionService) {}

  ngOnInit() {
    this.sharedBookService.getBookData().subscribe( book => {
      if (book != null) {
        this.book = book;
      }
      this.transactionService.getTransactions(this.book.id).subscribe( transactions => {
        this.axisLables = [];
        let z = 0;
        // Loop for sorting the incoming TransactionArray right for Graph
        for (let i = 0; i < transactions.length; i++) {
          const creationDate = new Date(transactions[i].creationDate);
          const axisLable =  (creationDate).getDate() + '.' + (creationDate.getMonth() + 1) + '.' + creationDate.getFullYear() ;
          const index = this.axisLables.indexOf(axisLable);
          if (index > -1) {
            this.data[index] = this.data[index] + transactions[i].amount;
          } else {
            this.axisLables[z] = axisLable;
            if (z - 1 >= 0) {
            this.data[z] = this.data[z - 1] + transactions[i].amount;
            } else {
              this.data[z] = transactions[i].amount;
            }
            z += 1;
          }
        }
      });
    });
  }


}
