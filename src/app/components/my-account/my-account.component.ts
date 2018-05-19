import { Component, OnInit } from '@angular/core';
import { User } from './../../shared/user/user';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  user = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    birth: ''
  };

  datepickerDate: NgbDateStruct = {
    year: Number(this.user.birth.substring(0, 4)),
    month: Number(this.user.birth.substring(5, 7)),
    day: Number(this.user.birth.substring(8, 9))
  };

  errorMessage = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserData().subscribe(data => {
      this.user = data;
    }, error => {
      this.errorMessage = error;
    });
  }

  onSaveDate(event: NgbDateStruct) {
    this.user.birth = `${event.year}-${event.month}-${event.day}`;
  }

  onSave() {

  }
}
