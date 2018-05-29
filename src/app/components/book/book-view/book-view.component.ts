import { Component, OnInit } from '@angular/core';
import { SharedBookService } from '../shared-book.service';
import { Book } from '../book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit {
  book: Book;
  navbarIsCollapsed = true;
  id: string;
  constructor(private sharedBookService: SharedBookService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.sharedBookService.getArrayData().subscribe(books => {
      if(books != null){
        books = books;
        for (let book of  books) {
          if (book.id === this.id) {
            this.book = book;
          }
        }
        console.log(this.book);
      }
    })

    this.sharedBookService.setSelectedIdBook(this.id);
  }

}
