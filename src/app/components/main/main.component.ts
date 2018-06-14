import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../components/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({

  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
