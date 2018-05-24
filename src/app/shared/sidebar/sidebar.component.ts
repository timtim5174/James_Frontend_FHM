import { Component, OnInit, Input } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('toggleState', [
      // What happens when toggleState is true
      state('true', style({
        left: '0px',
      })),
      // What happens when toggleState is false
      state('false', style({
        left: '-160px',
      })),
      // transition
      transition('* => *', animate('300ms')),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  @Input() shouldToggle = true;

  constructor() {
  }

  ngOnInit() {
  }
}

