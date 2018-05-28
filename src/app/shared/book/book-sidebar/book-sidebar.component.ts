import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { CreateBookComponent } from '../create-book/create-book.component';
import { UpdateBookComponent } from '../update-book/update-book.component';
import { AlertCloseableComponent } from '../../notifications/alert-closeable/alert-closeable.component';
import { Router } from '@angular/router';





@Component({
  selector: 'app-book-sidebar',
  templateUrl: './book-sidebar.component.html',
  styleUrls: ['./book-sidebar.component.scss']
})
export class BookSidebarComponent implements OnInit {
  books: Book[];
  errorMessage = '';
  createBookComponent = CreateBookComponent;
  updateBookComponent = UpdateBookComponent;
  selectedBook: Book;

  @ViewChild('BookSidebarCloseableAlert')
  private closeableAlert: AlertCloseableComponent;
  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/main/book']);
    this.bookService.getBooks().subscribe(
      books => {
        this.books = books;
        if (this.books.length) {
          this.selectedBook = this.books[0];
        }
      },
      error => this.errorMessage = error
    );
  }

  addBook(book: Book) {
    this.books.push(book);
    this.selectedBook = book;
  }

  removeBook(book: Book) {
    this.bookService.deleteBook(book.id).subscribe(
      success => { this.books = this.books.filter(b => b !== book); },
      error => {
        this.closeableAlert.reOpenAlert();
        this.errorMessage = error;
      }
    );
  }

  updateBook(book: Book) {
    const id = book.id;
    const arr = this.books.filter(b => b.id === id);
    this.books.forEach((b) => {
      if (b.id === id) {
        b.title = book.title;
        b.rangeEnum = book.rangeEnum;
        b.timeFrame = book.timeFrame;
      }
    });
  }

  isBookSelected(book: Book) {
    if (this.books.length > 1) {
      return this.selectedBook.id === book.id ? true : false;
    }
  }
}
