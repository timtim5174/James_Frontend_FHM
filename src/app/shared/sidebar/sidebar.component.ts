import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('toggleState', [
      state('true', style({
        left: '0px',
      })),
      state('false', style({
        left: '-250px',
      })),
      transition('* => *', animate('300ms')),
    ]),
    trigger('toggleArrow', [
      state('true', style({
        transform: 'rotate(180deg)',
      })),
      state('false', style({
        transform: 'rotate(0deg)',
      }))
    ]),
    trigger('toggleButtonNoRotate', [
      state('true', style({
        left: '250px',
      })),
      state('false', style({
        left: '0px',
      })),
      transition('* => *', animate('300ms')),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  @Input() shouldToggle = false;
  @Output() shouldPush = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  pushContent() {
    this.shouldPush.emit(!this.shouldPush);
  }


}
