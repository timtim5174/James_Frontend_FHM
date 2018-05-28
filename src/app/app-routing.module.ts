import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { DataPrivacyComponent } from './components/data-privacy/data-privacy.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { ContactComponent } from './components/contact/contact.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { AuthGuard } from './auth.guard';
import { MainComponent } from './components/main/main.component';
import { CreateBookComponent } from './shared/book/create-book/create-book.component';
import { DashboardMainComponent } from './shared/dashboard/dashboard-main/dashboard-main.component';
import { UpdateBookComponent } from './shared/book/update-book/update-book.component';
import { BookViewComponent } from './components/book-view/book-view.component';
import { BookSidebarComponent } from './shared/book/book-sidebar/book-sidebar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users/sign-up', component: SignUpComponent },
  { path: 'users/sign-in', component: SignInComponent },
  { path: 'users/sign-out', component: SignOutComponent },
  { path: 'createBook', component: CreateBookComponent },
  { path: 'updateBook', component: UpdateBookComponent },
  { path: 'privacy', component: DataPrivacyComponent },
  { path: 'legalnotice', component: LegalNoticeComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard], children: [
      { path: 'dashboard', component: DashboardMainComponent },
      { path: 'myAccount', component: MyAccountComponent },
      { path: 'sign-out', component: SignOutComponent },
      { path: 'book', component: BookViewComponent, children: [
      ]}
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
