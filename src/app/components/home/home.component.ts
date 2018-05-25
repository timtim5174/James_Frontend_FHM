import { Component, OnInit } from '@angular/core';
import { SharedSignOutService } from '../sign-out/shared-sign-out.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  errorMessage = '';
  constructor(private sharedService: SharedSignOutService) {
    this.sharedService.errorMessage.subscribe(
      message => this.errorMessage = message
    );
  }

  ngOnInit() {
    setTimeout(() => { this.errorMessage = ''; }, 3500);
  }



}
