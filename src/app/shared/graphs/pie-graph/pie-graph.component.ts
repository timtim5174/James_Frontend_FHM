import { Component, OnInit, OnChanges, Input, ElementRef } from '@angular/core';
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
      data: number[]
    }],
    legend: boolean;
  };

  pieChart: Chart | undefined[] = [];
  checkObject: Chart | undefined[] = this.pieChart;
  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.pieChart !== this.checkObject) {
      const dchart = <Chart> this.pieChart;
      dchart.destroy();
    }
    if (this.elementRef.nativeElement.querySelector(`#pieChart`) != null && this.data !== undefined) {
      this.initPieChart();
    }
  }

  private initPieChart() {
    this.pieChart = new Chart('pieChart', {
      type: 'doughnut',
      data: this.data,
      options: {
        animation: {
          duration: 2500, // general animation time
        },
        legend: {
          display: this.data.legend
        },
        maintainAspectRatio: false,
        title: {
          display: true,
          text: ''
        }
      }
    });
  }

}
