import { Component, OnInit } from '@angular/core';
import { User } from './../../shared/user/user';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  user = {
    firstname: 'Harry',
    lastname: 'Hacker',
    email: 'harry@hacker.de',
    password: 'harryhacker123',
    passwordCheck: 'harryhacker123',
    birth: '2018-05-08'
  };

  constructor() { }

  ngOnInit() {
  }

  onSaveDate(event: NgbDateStruct) {
    this.user.birth = `${event.year}-${event.month}-${event.day}`;
  }
}
