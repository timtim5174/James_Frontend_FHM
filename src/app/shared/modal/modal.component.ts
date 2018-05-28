import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from '../../components/user/sign-in/sign-in.component';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() component: Component;
  @Output() modalResult = new EventEmitter<any>();
  @Input() payload: any;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  async open() {
    try {
      const modalRef = await this.modalService.open(this.component);
      if (this.payload) { modalRef.componentInstance.modalInput = this.payload; }
      const result = await modalRef.result;
      this.modalResult.emit(result);
    } catch (err) { }
  }
}



