import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../components/user/user.service';
import { User, UserInfo } from '../../../components/user/user';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { BookService } from '../../book/book.service';
import { SharedBookService } from '../../book/shared-book.service';
import { BookInfo } from '../../book/book';
import { SharedUserService } from '../../user/shared-user.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {
  usersOfBook: UserInfo[] = [];
  booksInfo: BookInfo[] = [];
  user: User = {
    firstname: 'Test',
    lastname: 'Test',
    birth: new Date(),
    email: 'asfasf',
    password: 'asdfasdf'
  };
  img: SafeUrl;
  members = 5;
  bookName = 'Testbook';
  incomes = 2000;
  outgoings = -2500;
  constructor(private userService: UserService, private sharedUserService: SharedUserService,
    private bookService: BookService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.sharedUserService.getUserImage().subscribe(img => {
      if (img != null) {
        this.img = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(img));
      }
    });
    this.loadBooksData();
  }

  async loadBooksData() {
    let i = 0;
    const books = await this.bookService.getBooks().toPromise();
    books.forEach(async book => {
      const users = await this.userService.getUsersOfBook(book.id).toPromise();
      users.forEach(async user => {
        this.usersOfBook.push({id: user.id, firstname: user.firstname, lastname: user.lastname});
        i++;
      });
      this.booksInfo.push({bookName: book.title, members: i, users: this.usersOfBook});
      this.usersOfBook = [];
    });
  }
}
