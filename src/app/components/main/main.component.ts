import { Component, OnInit, Input } from '@angular/core';

@Component({

  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  toggle = true;

  constructor() { }

  ngOnInit() {
  }

  handleToggle() {
    if (this.toggle) {
      document.getElementById('sidenav').style.marginLeft = '0';
      document.getElementById('content').style.marginLeft = '0';
    } else {
      document.getElementById('content').style.marginLeft = '160px';

    }
    this.toggle = !this.toggle;
  }

}
