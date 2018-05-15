import { Component, OnInit, Output, EventEmitter, SimpleChanges, Input } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  model: NgbDateStruct;
  @Input() title: string;
  @Output() save = new EventEmitter<NgbDateStruct>();

  constructor() { }


  ngOnInit() {
  }

  myFunc() {
    this.save.emit(this.model);
  }
}
