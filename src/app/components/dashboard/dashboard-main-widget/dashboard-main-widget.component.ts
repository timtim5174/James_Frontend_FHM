import { Component, OnInit, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { User, UserInfo } from '../../user/user';

@Component({
  selector: 'app-dashboard-main-widget',
  templateUrl: './dashboard-main-widget.component.html',
  styleUrls: ['./dashboard-main-widget.component.scss']
})
export class DashboardMainWidgetComponent implements OnInit {

  @Input() members: number;
  @Input() bookName: string;
  @Input() incomes: number;
  @Input() outgoings: number;
  @Input() users: UserInfo [];
  constructor() { }

  ngOnInit() {
  }

  onMembersClicked() {
    alert('XXXXX');
  }
}
