import { Component, OnInit } from '@angular/core';
import { BookDataService} from '../shared-book.service';
import { Book } from '../book';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit {
  navbarIsCollapsed = true;
  book: Book;
  constructor(private bookDataService: BookDataService) {
    this.bookDataService.getBook().subscribe(book => {
      this.book = book;
    });
  }

  ngOnInit() {
  }

}
