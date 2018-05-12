import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-standard-notification',
  templateUrl: './standard-notification.component.html',
  styleUrls: ['./standard-notification.component.scss']
})
export class StandardNotificationComponent implements OnInit {

  @Input() info: string;
  @Input() cssClasses: string;
  constructor() { }

  ngOnInit() {
  }

}
