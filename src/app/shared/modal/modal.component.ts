import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from '../../components/sign-in/sign-in.component';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() component: Component;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }


  open() {
    this.modalService.open(this.component, { centered: true });
  }
}
