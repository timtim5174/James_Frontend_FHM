import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-closeable',
  templateUrl: './alert-closeable.component.html',
  styleUrls: ['./alert-closeable.component.scss']
})
export class AlertCloseableComponent implements OnInit {
  isClosed = false;
  @Input() message: string;
  @Input() style: string;

  constructor() {
  }

  ngOnInit() {
  }

  reOpenAlert() {
    this.isClosed = false;
  }

  closeAlert() {
    this.isClosed = true;
  }
}
