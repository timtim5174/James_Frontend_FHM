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

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users/sign-up', component: SignUpComponent },
  { path: 'users/sign-in', component: SignInComponent },
  { path: 'users/sign-out', component: SignOutComponent },
  { path: 'newBook', component: CreateBookComponent },
  { path: 'privacy', component: DataPrivacyComponent },
  { path: 'legalnotice', component: LegalNoticeComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard], children: [
      { path: 'dashboard', component: DashboardMainComponent },
      { path: 'myAccount', component: MyAccountComponent },
      { path: 'sign-out', component: SignOutComponent }
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
