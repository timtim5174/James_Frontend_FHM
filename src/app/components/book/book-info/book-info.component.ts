import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SharedBookService } from '../shared-book.service';
import { Book } from '../book';
import { Chart } from 'chart.js';
import { TransactionService } from '../../transaction/transaction.service';
import { SharedTransactionService } from '../../transaction/shared-transaction.service';
import { PieGraph } from '../../../shared/graphs/pie-graph/pie-graph';
import { LineGraph } from '../../../shared/graphs/line-graph/line-graph';
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
  lineGraph: LineGraph;
  dataPieChart: PieGraph;
  transactionheight = 0;
  transactions: Transaction[];

  constructor(private sharedBookService: SharedBookService, private sharedTransactionService: SharedTransactionService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
    this.sharedBookService.getBookData().subscribe(book => {
      if (book != null) {
        this.book = book;
      }
      this.sharedTransactionService.getTransactions().subscribe(transactions => {
        // Logic to just reload the graphs when Observable changes
        if (!(transactions === this.transactions)) {
          this.linegraph(transactions);
          this.pie(transactions);
        }
        this.transactions = transactions;
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
      this.transactionheight = window.innerHeight - topDistance - difTable;
      // When Footer meets viewport aswell
      if ((window.innerHeight + difFooter) >= footerBot) {
        this.transactionheight = window.innerHeight - topDistance - difTable + footerBotheight;
      }
      // "When Graph gets sticky" - graph reaches Navbar
    } else {
      // When footer, transactions and navbar are part of viewport - "sticky graph" + transactions + footer
      if ((window.innerHeight + difFooter) >= footerBot) {
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

  linegraph(transactions: Transaction[]) {
    const data = [];
    if (transactions != null) {
      const axisLables = [];
      let z = 0;
      // Loop for sorting the incoming TransactionArray right for Graph
      // forEach
      for (let i = 0; i < transactions.length; i++) {
        const creationDate = new Date(transactions[i].creationDate);
        const axisLable = (creationDate).getDate() + '.' + (creationDate.getMonth() + 1) + '.' + creationDate.getFullYear();
        const index = axisLables.indexOf(axisLable);
        if (index > -1) {
          data[index] = data[index] + transactions[i].amount;
        } else {
          axisLables[z] = axisLable;
          if (z - 1 >= 0) {
            data[z] = data[z - 1] + transactions[i].amount;
          } else {
            data[z] = transactions[i].amount;
          }
          z += 1;
        }
      }

      this.lineGraph = {
        type: 'line',
        axisLables: axisLables,
        dataset: [{
          label: 'Amount',
          data: data,
          fill: true,
          backgroundColor: 'rgba(0, 0, 255, 0.3)',
          borderColor: 'rgba(0, 0, 255, 0.9)'
        }],
        x: {
          name: 'x',
          show: false
        },
        y: {
          name: 'y',
          show: false
        },
        chartname: '',
        elements: {
          tension: 0.3,
          radius: 0
        }
      };
    }
  }

  pie(transaction: Transaction[]) {
    this.dataPieChart = {
      labels: ['Incomes', 'Outgoings'],
      datasets: [
        {
          backgroundColor: ['#2e86f7', '#dcdedf'],
          data: [2500, 3000]
        }
      ]
    };
  }
}
