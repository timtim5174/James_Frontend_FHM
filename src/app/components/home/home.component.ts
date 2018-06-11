import { Component, OnInit } from '@angular/core';
import { SharedUserService } from '../user/shared-user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  errorMessage = '';
  constructor(private sharedService: SharedUserService) {
    this.sharedService.getSignOutSubject().subscribe(
      message => this.errorMessage = message
    );
  }

  ngOnInit() {
    setTimeout(() => { this.errorMessage = ''; }, 3500);
  }



}
