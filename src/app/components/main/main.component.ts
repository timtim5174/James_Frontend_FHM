import { Component, OnInit } from '@angular/core';
import {trigger, style, animate, transition, state} from '@angular/animations';

@Component({
  
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),//
        animate('0.5s ease-in-out')
      ]),
      transition('* => void', [
        animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
      ])
    ]),
  ],
})
export class MainComponent implements OnInit {

  toggle:boolean = true;
  constructor() { }

  ngOnInit() {
  }
}
