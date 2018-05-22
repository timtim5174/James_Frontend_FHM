import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class SidebarComponent implements OnInit {

  constructor(config: NgbDropdownConfig) {
    config.placement = 'right-bottom';
    config.autoClose = false;
  }

  ngOnInit() {
  }

}
