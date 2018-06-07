import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-pie-graph',
  templateUrl: './pie-graph.component.html',
  styleUrls: ['./pie-graph.component.scss']
})
export class PieGraphComponent implements OnInit, OnChanges {
  @Input() data: {
    labels: string[],
    datasets: [{
      backgroundColor: string[],
      data: number []
    }]
  };

  pieChart: any = [];
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.initPieChart();
  }

  private initPieChart() {
    this.pieChart = new Chart('pieChart', {
      type: 'pie',
      data: this.data,
      options: {
        maintainAspectRatio: false,
        title: {
          display: true,
          text: ''
        }
      }
    });
  }

}
