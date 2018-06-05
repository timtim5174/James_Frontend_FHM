import { Component, OnInit } from '@angular/core';
import { SharedBookService } from '../shared-book.service';
import { Book } from '../book';
import { ActivatedRoute } from '@angular/router';
import { AddUserToBookComponent } from '../add-user-to-book/add-user-to-book.component';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit {
  book: Book = {
    id: '',
    title: '',
    creationDate: null,
    timeFrame: null,
    rangeEnum: null
  };
  addUserToBookComponent = AddUserToBookComponent;
  navbarIsCollapsed = true;
  id: string;
  constructor(private sharedBookService: SharedBookService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.sharedBookService.setSelectedIdBook(this.id);
      this.sharedBookService.getBookArrayData().subscribe(books => {
        if (books != null) {
          for (const book of books) {
            if (book.id === this.id) {
              this.book = book;
            }
          }
        }
        if (this.book != null) {
          this.sharedBookService.setBookData(this.book);
        }
      });
    });
  }

}

