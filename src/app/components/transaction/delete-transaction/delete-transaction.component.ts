import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { AlertCloseableComponent } from '../../../shared/notifications/alert-closeable/alert-closeable.component';

@Component({
  selector: 'app-delete-transaction',
  templateUrl: './delete-transaction.component.html',
  styleUrls: ['./delete-transaction.component.scss']
})
export class DeleteTransactionComponent implements OnInit {
  @Input() modalInput: Transaction;
  errorMessage = '';
  deleteClicked = false;

  @ViewChild('DeleteTransactionCloseableAlert')
  private closeableAlert: AlertCloseableComponent;

  constructor(public activeModal: NgbActiveModal, private transactionService: TransactionService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.transactionService.deleteTransaction(this.modalInput.id, this.modalInput.bookId).subscribe(
      success => this.activeModal.close(this.modalInput),
      error => {
        this.errorMessage = error;
        this.closeableAlert.reOpenAlert();
        this.deleteClicked = false;
      }
    );
  }
}
