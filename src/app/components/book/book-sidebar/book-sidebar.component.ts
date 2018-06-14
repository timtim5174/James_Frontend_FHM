import { Component, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { CreateBookComponent } from '../create-book/create-book.component';
import { UpdateBookComponent } from '../update-book/update-book.component';
import { AlertCloseableComponent } from '../../../shared/notifications/alert-closeable/alert-closeable.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DeleteBookComponent } from '../delete-book/delete-book.component';
import { SharedBookService } from '../shared-book.service';
import { SharedSidebarService } from '../../sidebar/shared-sidebar.service';





@Component({
  selector: 'app-book-sidebar',
  templateUrl: './book-sidebar.component.html',
  styleUrls: ['./book-sidebar.component.scss']
})
export class BookSidebarComponent implements OnInit {
  books: Book[];
  selectedBookId: String;
  errorMessage = '';
  createBookComponent = CreateBookComponent;
  updateBookComponent = UpdateBookComponent;
  deleteBookComponent = DeleteBookComponent;
  selectedBook: Book;

  @ViewChild('BookSidebarCloseableAlert')
  private closeableAlert: AlertCloseableComponent;
  constructor(private bookService: BookService, private router: Router, private sharedBookService: SharedBookService,
    private sharedSidebarService: SharedSidebarService) { }

  ngOnInit() {
    this.bookService.getBooks().subscribe(
      books => {
        this.books = books;
        if (this.books.length) {
          this.selectedBook = this.books[0];
          this.sharedBookService.setBookArrayData(this.books);
        }
        this.sharedBookService.getSelectedIdBook().subscribe(id => {
          for (const book of this.books) {
            if (book.id === id) {
              this.selectedBook = book;
            }
          }
        });
      },
      error => this.errorMessage = error
    );
  }

  addBook(book: Book) {
    this.books.push(book);
    this.books.sort((a: Book, b: Book) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    });
    this.selectedBook = book;
    this.clickBook(book);
  }

  removeBook(book: Book) {
    this.books = this.books.filter(b => b.id !== book.id);
    if (this.books.length) {
      this.clickBook(this.books[0]);
    } else {
      this.router.navigate(['home']);
    }
  }

  updateBook(book: Book) {
    this.sharedBookService.setUpdateDeleteBookSubject(book);
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
    return this.selectedBook.id === book.id && this.sharedSidebarService.selectedIcon === 'book' ? true : false;
  }

  clickBook(book: Book) {
    this.selectedBook = book;
    this.sharedBookService.setUpdateDeleteBookSubject(book);
    this.sharedBookService.setAddUserToBookSubject(book);
    this.sharedBookService.setSelectedBook(book);
    this.sharedSidebarService.setSelectedIcon('book');
    this.router.navigate(['/main/book', book.id, 'info']);
  }

}
