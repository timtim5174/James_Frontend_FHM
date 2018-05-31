import { Component, OnInit, Input, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit, AfterViewInit {
  @Input() type: string;
  @Input() axisLables: string[];
  @Input() data: [{
    label: string,
    data: number[],
    fill: boolean,
    backgroundColor: string,
    borderColor: string
  }];
  @Input() xName: string;
  @Input() yName: string;
  @Input() chartName: string;

  chart: any;
  constructor() {
    this.chart = [];
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.chartit();
  }
  private chartit() {
    this.chart = new Chart('canvas', {
      type: this.type,
      data: {
        labels: this.axisLables,
        datasets: this.data
      },
      options: {
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
          mode: 'nearest',
          intersect: true
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
