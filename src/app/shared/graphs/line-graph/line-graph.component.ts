import { Component, OnInit, Input, AfterViewInit, OnChanges, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { LineGraph } from './line-graph';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnChanges {
  @Input() input: LineGraph;

  chart: Chart | undefined[] = [];
  checkObject: Chart | undefined[] = this.chart;
  constructor(private elementRef: ElementRef) {
  }

  ngOnChanges() {
    if (this.chart !== this.checkObject) {
      const dchart = <Chart> this.chart;
      dchart.destroy();
    }
    if (this.elementRef.nativeElement.querySelector(`#canvas`) != null && this.input !== undefined) {
      this.chartit();
    }
  }

  private chartit() {
    this.chart = new Chart('canvas', {
      type: this.input.type,
      data: {
        labels: this.input.axisLables,
        datasets: this.input.dataset
      },
      options: {
          elements: {
            line: {
            tension: this.input.elements.tension, // disables bezier curves
            },
            point: {
              radius : this.input.elements.radius
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
