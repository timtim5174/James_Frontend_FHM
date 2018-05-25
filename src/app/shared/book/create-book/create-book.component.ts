import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from '../book.service';
import { Book } from '../book';


@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {
  newBook: Partial<Book> = {
    title: '',
    rangeEnum: 'MONTHLY'
  };


  constructor(public activeModal: NgbActiveModal, private bookService: BookService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.bookService.createBook(this.newBook).subscribe(
      book => { this.activeModal.close(book); }
    );
  }

}
