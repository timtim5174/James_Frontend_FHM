import { Component, OnInit, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { User } from '../../user/user';

@Component({
  selector: 'app-dashboard-main-widget',
  templateUrl: './dashboard-main-widget.component.html',
  styleUrls: ['./dashboard-main-widget.component.scss']
})
export class DashboardMainWidgetComponent implements OnInit {

  @Input() img: SafeUrl;
  @Input() user: User;
  @Input() members: number;
  @Input() bookName: string;
  @Input() incomes: number;
  @Input() outgoings: number;
  constructor() { }

  ngOnInit() {
  }

}
