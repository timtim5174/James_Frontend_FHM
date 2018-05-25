import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { CreateBookComponent } from '../create-book/create-book.component';





@Component({
  selector: 'app-book-sidebar',
  templateUrl: './book-sidebar.component.html',
  styleUrls: ['./book-sidebar.component.scss']
})
export class BookSidebarComponent implements OnInit {
  books: Book[];
  errorMessage = '';
  createBookComponent = CreateBookComponent;
  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getBooks().subscribe(
      books => this.books = books
    );
  }

  updateBooks(book) {
    this.books.push(book);
  }

  removeBook(book: Book) {
    console.log(book.id);
    this.bookService.deleteBook(book.id).subscribe(
      success => { console.log('XXX'); this.books = this.books.filter(b => b !== book); },
      error => { this.errorMessage = error; console.log('YYY'); }
    );
  }
}
