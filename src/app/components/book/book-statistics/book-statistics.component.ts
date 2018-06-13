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
  }
}
