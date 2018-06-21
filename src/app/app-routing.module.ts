import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { SignOutComponent } from './components/user/sign-out/sign-out.component';
import { DataPrivacyComponent } from './components/data-privacy/data-privacy.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { MyAccountComponent } from './components/user/my-account/my-account.component';
import { AuthGuard } from './auth.guard';
import { MainComponent } from './components/main/main.component';
import { CreateBookComponent } from './components/book/create-book/create-book.component';
import { DashboardMainComponent } from './components/dashboard/dashboard-main/dashboard-main.component';
import { UpdateBookComponent } from './components/book/update-book/update-book.component';
import { BookViewComponent } from './components/book/book-view/book-view.component';
import { BookSidebarComponent } from './components/book/book-sidebar/book-sidebar.component';
import { DeleteBookComponent } from './components/book/delete-book/delete-book.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TransactionOverviewComponent } from './components/transaction/transaction-overview/transaction-overview.component';
import { BookInfoComponent } from './components/book/book-info/book-info.component';
import { AddUserToBookComponent } from './components/book/add-user-to-book/add-user-to-book.component';
import { MembersComponent } from './components/dashboard/members/members.component';
import { PieGraphComponent } from './shared/graphs/pie-graph/pie-graph.component';
import { BookStatisticsComponent } from './components/book/book-statistics/book-statistics.component';
import { CreateTransactionComponent } from './components/transaction/create-transaction/create-transaction.component';
import { UpdateTransactionComponent } from './components/transaction/update-transaction/update-transaction.component';
import { DeleteTransactionComponent } from './components/transaction/delete-transaction/delete-transaction.component';
import { DeleteUserComponent } from './components/user/delete-user/delete-user.component';




const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users/sign-up', component: SignUpComponent },
  { path: 'users/sign-in', component: SignInComponent },
  { path: 'users/sign-out', component: SignOutComponent },
  { path: 'privacy', component: DataPrivacyComponent },
  { path: 'legalnotice', component: LegalNoticeComponent },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard], children: [
      { path: 'dashboard', component: DashboardMainComponent },
      { path: 'myAccount', component: MyAccountComponent, children: [
        { path: 'deleteUser', component: DeleteUserComponent },
        { path: 'members', component: MembersComponent },
      ] },
      { path: 'sign-out', component: SignOutComponent },
      { path: 'book/:id', component: BookViewComponent, children: [
          { path: 'home', component: HomeComponent },
          { path: 'transactions', component: TransactionOverviewComponent },
          { path: 'info', component: BookInfoComponent },
          { path: 'statistics', component: BookStatisticsComponent },
          { path: 'createBook', component: CreateBookComponent },
          { path: 'updateBook', component: UpdateBookComponent },
          { path: 'deleteBook', component: DeleteBookComponent },
          { path: 'deleteTransaction', component: DeleteTransactionComponent },
          { path: 'createTransaction', component: CreateTransactionComponent },
          { path: 'updateTransaction', component: UpdateTransactionComponent },
          { path: 'addUserToBook', component: AddUserToBookComponent },
        ]
      }
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
