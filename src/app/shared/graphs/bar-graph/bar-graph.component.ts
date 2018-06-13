import { Component, OnChanges, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { BarGraph } from './bar-graph';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnChanges {
  @Input() input: BarGraph;
  constructor() { }
  /**
   * Inputs: data, options
   */
  chart: any = [];
  ngOnChanges() {

  }

  chartit() {
    this.chart = new Chart('canvas', {
      type: this.input.type,
      data: {
        labels: this.input.axisLables,
        datasets: this.input.dataset
      },
      options: {
        elements: {
          line: {
            tension: this.input.elements.tension,
          },
          point: {
            radius: this.input.elements.radius
          }
        },
        legend: {
          display: false
        },
        animation: {
          duration: 2500
        },
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: this.input.chartname
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest'
        },
        scales: {
          xAxes: [{
            display: this.input.x.show,
            scaleLabel: {
              display: this.input.x.show,
              labelString: this.input.x.name
            }
          }],
          yAxes: [{
            display: this.input.y.show,
            scaleLabel: {
              display: this.input.y.show,
              labelString: this.input.y.name
            }
          }]
        }

      }
    });
  }
}
