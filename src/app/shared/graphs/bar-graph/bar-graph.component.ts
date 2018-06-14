import { Component, OnChanges, Input, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { BarGraph } from './bar-graph';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnChanges {
  @Input() input: BarGraph;
  constructor(private elementRef: ElementRef) { }
  /**
   * Inputs: data, options
   */
  chart: any = [];
  checkObject: any = this.chart;
  ngOnChanges() {
    if (this.chart !== this.checkObject) {
      this.chart.destroy();
    }
    if (this.elementRef.nativeElement.querySelector(`#bargraph`) != null && this.input !== undefined) {
      this.chartit();
    }
  }

  chartit() {
    this.chart = new Chart('bargraph', {
      type: this.input.type,
      data: {
        labels: this.input.data.labels,
        datasets: this.input.data.datasets
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: { display: this.input.options.legend.display },
        title: {
          display: this.input.options.title.display
        },
        scales: {
        xAxes: [{
          barPercentage: 0.1,
          barThickness: 0.1
        }]
    }
      }
    });
  }
}
