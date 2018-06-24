import { Component, OnInit, Input } from '@angular/core';
import { User, UserInfo } from '../../user/user';
import { MembersComponent } from '../members/members.component';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-dashboard-main-widget',
  templateUrl: './dashboard-main-widget.component.html',
  styleUrls: ['./dashboard-main-widget.component.scss']
})
export class DashboardMainWidgetComponent implements OnInit {
  membersComponent = MembersComponent;
  @Input() members: number;
  @Input() bookName: string;
  @Input() incomes: number;
  @Input() outgoings: number;
  @Input() users: UserInfo [];

  constructor(private userService: UserService) { }

  ngOnInit() {
  }
}
