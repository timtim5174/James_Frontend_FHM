import { Component, OnInit } from '@angular/core';
import { PieGraph } from '../../../shared/graphs/pie-graph/pie-graph';

@Component({
  selector: 'app-book-statistics',
  templateUrl: './book-statistics.component.html',
  styleUrls: ['./book-statistics.component.scss']
})
export class BookStatisticsComponent implements OnInit {
  dataPieChart: PieGraph;

  constructor() { }

  ngOnInit() {
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
