import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SharedBookService } from '../shared-book.service';
import { Book } from '../book';
import { Chart } from 'chart.js';
import { TransactionService } from '../../transaction/transaction.service';
import { SharedTransactionService } from '../../transaction/shared-transaction.service';
import { PieGraph } from '../../../shared/graphs/pie-graph/pie-graph';
import { LineGraph } from '../../../shared/graphs/line-graph/line-graph';

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
  height: any;

  dataset = [{
    label: this.pointLable,
    data: this.data,
    fill: this.fill,
    backgroundColor : this.backgroundColor,
    borderColor: this.borderColor
  }];
  chart = [];
  dataPieChart: PieGraph;
  dataLineGraph: LineGraph;
  transactionheight = 0;

  constructor(private sharedBookService: SharedBookService, private sharedTransactionService: SharedTransactionService,
  private elementRef: ElementRef) {}

  ngOnInit() {
    // this.transactionheight = window.innerHeight - document.getElementById('transactions').getBoundingClientRect().top - 64;
    this.dataPieChart = {
        labels: ['Incomes', 'Outgoings'],
        datasets: [
          {
            backgroundColor: ['#2e86f7', '#dcdedf'],
            data: [2500, 3000]
          }
        ]
      };
    this.sharedBookService.getBookData().subscribe( book => {
      if (book != null) {
        this.book = book;
      }
      this.sharedTransactionService.getTransactions().subscribe( transactions => {
        window.addEventListener('scroll', this.scroll, true);
        this.linegraph(transactions);
      });
    });
  }

  /**
   * called when transaction container is listening a scroll-event - used for graphlogic
   */
  scroll = () => {
    this.graphlogic();
  }

  /**
   * Logic for Graph Positioning behind Transaction Table
   * There are numbers: difFooter: Height of Footer; difTable: Height of Table-head; difNavbar: Height of Navbar
   * topDistance: Space between Table and Top of Page; footerBotHeight: negative Space of Footer when in View
   * e.g. when Footer is half in Viewport, footerBotHeight will be -72/2 = -36
   */
  graphlogic() {
    // Defining of Variables
    const topDistance = document.getElementById('transactions').getBoundingClientRect().top;
    const footerBot = document.getElementById('footer').getBoundingClientRect().bottom;
    const difFooter = document.getElementById('footer').clientHeight;
    const difTable = document.getElementById('tablehead').clientHeight;
    const difNavbar = document.getElementById('nav').clientHeight;
    const footerBotheight = footerBot - window.innerHeight - difFooter;

    // When first Element of Transaction-List does NOT meet Navbar (Everyting betwenn - "When its not sticky")
    if (topDistance >= difNavbar - difTable) {
      this.transactionheight =  window.innerHeight - topDistance - difTable;
      // When Footer meets viewport aswell
      if ((window.innerHeight + difFooter) >= footerBot ) {
        this.transactionheight = window.innerHeight - topDistance - difTable + footerBotheight;
      }
      // "When Graph gets sticky" - graph reaches Navbar
    } else {
      // When footer, transactions and navbar are part of viewport - "sticky graph" + transactions + footer
      if ((window.innerHeight + difFooter) >= footerBot ) {
        this.transactionheight = window.innerHeight - difNavbar + footerBotheight;
        // When just footer and transactions are part of viewport - "sticky graph" + transactions
      } else {
        this.transactionheight = window.innerHeight - difNavbar;
      }
    }
  }

  setStyles() {
    return {
      'height': this.transactionheight + 'px',
      'margin-bottom': 'calc(-' + this.transactionheight + 'px - 64px)'
    };
  }

  linegraph (transactions: any[]) {
    if (transactions != null) {
      this.axisLables = [];
      let z = 0;
      // Loop for sorting the incoming TransactionArray right for Graph
      // forEach
      for (let i = 0; i < transactions.length; i++) {
        const creationDate = new Date(transactions[i].creationDate);
        const axisLable =  (creationDate).getDate() + '.' + (creationDate.getMonth() + 1) + '.' + creationDate.getFullYear();
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
    }
  }
}
