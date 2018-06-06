import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { SignOutComponent } from './components/user/sign-out/sign-out.component';
import { DataPrivacyComponent } from './components/data-privacy/data-privacy.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { ContactComponent } from './components/contact/contact.component';
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
import { CreateTransactionComponent } from './components/transaction/create-transaction/create-transaction.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users/sign-up', component: SignUpComponent },
  { path: 'users/sign-in', component: SignInComponent },
  { path: 'users/sign-out', component: SignOutComponent },
  { path: 'createBook', component: CreateBookComponent },
  { path: 'updateBook', component: UpdateBookComponent },
  { path: 'deleteBook', component: DeleteBookComponent },
  { path: 'addUserToBook', component: AddUserToBookComponent },
  { path: 'privacy', component: DataPrivacyComponent },
  { path: 'legalnotice', component: LegalNoticeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'members', component: MembersComponent },
<<<<<<< HEAD
  { path: 'main', component: MainComponent, canActivate: [AuthGuard], children: [
    { path: 'dashboard', component: DashboardMainComponent },
    { path: 'myAccount', component: MyAccountComponent },
    { path: 'sign-out', component: SignOutComponent },
    { path: 'book/:id', component: BookViewComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'transactions', component: TransactionOverviewComponent },
      { path: 'createTransaction', component: CreateTransactionComponent },
      { path: 'info', component: BookInfoComponent},
=======
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard], children: [
      { path: 'dashboard', component: DashboardMainComponent },
      { path: 'myAccount', component: MyAccountComponent },
      { path: 'sign-out', component: SignOutComponent },
      {
        path: 'book/:id', component: BookViewComponent, children: [
          { path: 'home', component: HomeComponent },
          { path: 'transactions', component: TransactionOverviewComponent },
          { path: 'info', component: BookInfoComponent }
>>>>>>> 86b414b404af8c8c0151b8fbda25acafe1b15ae6
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
