import { Component, OnInit, Input, AfterViewInit, OnChanges, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnChanges {
  @Input() type: string;
  @Input() axisLables: string[];
  @Input() data: number[];
  @Input() dataset: [{
    label: string,
    data: number[];
    fill: boolean,
    backgroundColor: string,
    borderColor: string
  }];
  @Input() xName: string;
  @Input() yName: string;
  @Input() chartName: string;

  chart: any = [];
  checkObject: any = this.chart;
  constructor(private elementRef: ElementRef) {
  }

  ngOnChanges() {
    if (this.chart !== this.checkObject) {
      this.chart.destroy();
    }
    if (this.elementRef.nativeElement.querySelector(`#canvas`) != null) {
      this.chartit();
    }
  }

  private chartit() {
    this.chart = new Chart('canvas', {
      type: this.type,
      data: {
        labels: this.axisLables,
        datasets: this.dataset
      },
      options: {
          elements: {
            line: {
            tension: 0.1, // disables bezier curves
            }
          },
          maintainAspectRatio: false,
          responsive: true,
          title: {
          display: true,
          text: this.chartName
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
            display: true,
            scaleLabel: {
              display: true,
              labelString: this.xName
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: this.yName
            }
          }]
        }

      }
    });
  }
}
