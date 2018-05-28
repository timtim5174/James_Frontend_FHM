import { Component, OnInit } from '@angular/core';
import { SharedBookService} from '../shared-book.service';
import { Book } from '../book';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit {
  navbarIsCollapsed = true;
  book: Book;
  constructor(private sharedBookService: SharedBookService) { }

  ngOnInit() {
    this.sharedBookService.getBook().subscribe(book => {
      this.book = book;
    });
  }

}
