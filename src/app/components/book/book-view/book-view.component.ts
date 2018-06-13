import { Component, OnInit } from '@angular/core';
import { SharedBookService } from '../shared-book.service';
import { Book } from '../book';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../transaction/transaction.service';
import { SharedTransactionService } from '../../transaction/shared-transaction.service';
import { CategoryService } from '../../category/category.service';
import { SharedCategoryService } from '../../category/shared-category.service';
import { AddUserToBookComponent } from '../add-user-to-book/add-user-to-book.component';
import { UserService } from '../../user/user.service';
import { SharedUserService } from '../../user/shared-user.service';

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
  constructor(
    private sharedBookService: SharedBookService,
    private transactionService: TransactionService,
    private sharedTransactionService: SharedTransactionService,
    private categoryService: CategoryService,
    private sharedCategoryService: SharedCategoryService,
    private route: ActivatedRoute,
    private userService: UserService,
  private sharedUserService: SharedUserService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id != null) {
        this.transactionService.getTransactions(this.id).subscribe(
          transactions => {
            this.sharedTransactionService.setTransactions(transactions);
          });

          this.userService.getUsersOfBook(this.id).subscribe(books => {
            this.sharedUserService.setUserForBookSubject(books);
          });
      }
      this.categoryService.getBookCategories(this.id).subscribe(categorys => {
        this.sharedCategoryService.setCategorys(categorys);
      });
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

