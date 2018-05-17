import { Component, OnInit, Output, EventEmitter, SimpleChanges, Input } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  model: NgbDateStruct;
  minDate: NgbDateStruct = { year: 1900, month: 1, day: 1 };
  datePicked = false;
  @Input() title: string;
  @Output() save = new EventEmitter<NgbDateStruct>();

  constructor() { }


  ngOnInit() {
  }

  myFunc() {
    this.datePicked = true;
    this.save.emit(this.model);
  }

  openOrDone() {
    return this.datePicked ? 'done form-control' : 'open form-control';
  }
}
