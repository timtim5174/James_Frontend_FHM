import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SharedBookService } from '../shared-book.service';
import { Book } from '../book';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent implements OnInit {

  book: Book = {
    id: '',
    title: '',
    creationDate: null,
    timeFrame: null,
    rangeEnum: null
  };
  // Preparing Dataset for Graph
  type = 'line';
  axisLables = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
  pointLable = 'Amount';
  data = [12, 19, 3, 5, -6, 3];
  backgroundColor = 'rgba(0, 0, 255, 0.3)';
  borderColor = 'rgba(0, 0, 255, 0.9)';
  fill = true;

  dataset = [{
    label: this.pointLable,
    data: this.data,
    fill: this.fill,
    backgroundColor : this.backgroundColor,
    borderColor: this.borderColor
  },
  {
    label: 'Amount2',
    data: [15, 30, 45, 20, -10, 5],
    fill: false,
    backgroundColor : 'red',
    borderColor: 'green'
  }];
  chart = [];


  constructor(private sharedBookService: SharedBookService) {}
  ngOnInit() {
    this.sharedBookService.getBookData().subscribe( book => {
      this.book = book;
    });
  }


}
