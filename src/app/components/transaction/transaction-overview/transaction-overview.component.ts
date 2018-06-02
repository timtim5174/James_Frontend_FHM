import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-overview',
  templateUrl: './transaction-overview.component.html',
  styleUrls: ['./transaction-overview.component.scss']
})
export class TransactionOverviewComponent implements OnInit {
  @Input() book;
  constructor() { }

  ngOnInit() {
  }

}
