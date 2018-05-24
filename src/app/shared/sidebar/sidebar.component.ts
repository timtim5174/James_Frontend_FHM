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
        left: '-160px',
      })),
      transition('* => *', animate('300ms')),
    ]),
    trigger('toggleButton', [
      state('true', style({
        transform: 'rotate(180deg)',
        left: '165px',
      })),
      state('false', style({
        transform: 'rotate(0deg)',
        left: '5px',
      })),
      transition('* => *', animate('300ms')),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  @Input() shouldToggle = true;
  @Output() shouldPush = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  pushContent() {
    this.shouldPush.emit(!this.shouldPush);
  }
}

