import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { EqualPasswordsDirective } from './shared/authentication/equal-passwords.directive';
import { EmailDirective } from './shared/authentication/email.directive';
import { PasswordDirective } from './shared/authentication/password.directive';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { StandardNotificationComponent } from './shared/notifications/standard-notification/standard-notification.component';
import { DateDirective } from './shared/authentication/date.directive';
import { DatepickerComponent } from './shared/datepicker/datepicker.component';
import { DataPrivacyComponent } from './components/data-privacy/data-privacy.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { ContactComponent } from './components/contact/contact.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownComponent } from './shared/dropdown/dropdown.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { ModalComponent } from './shared/modal/modal.component';
import { ErrorMessageComponent } from './shared/notifications/error-message/error-message.component';
import { UserService } from './shared/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertCloseableComponent } from './shared/notifications/alert-closeable/alert-closeable.component';
import { MainComponent } from './components/main/main.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookSidebarComponent } from './shared/book/book-sidebar/book-sidebar.component';
import { BookMainComponent } from './shared/book/book-main/book-main.component';
import { CreateBookComponent } from './shared/book/create-book/create-book.component';
import { DashboardMainComponent } from './shared/dashboard/dashboard-main/dashboard-main.component';
import { DashboardSidebarComponent } from './shared/dashboard/dashboard-sidebar/dashboard-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    SignOutComponent,
    EqualPasswordsDirective,
    EmailDirective,
    PasswordDirective,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    StandardNotificationComponent,
    DateDirective,
    DatepickerComponent,
    DataPrivacyComponent,
    LegalNoticeComponent,
    ContactComponent,
    DropdownComponent,
    MyAccountComponent,
    ModalComponent,
    ErrorMessageComponent,
    AlertCloseableComponent,
    MainComponent,
    SidebarComponent,
    BookSidebarComponent,
    BookMainComponent,
    CreateBookComponent,
    DashboardMainComponent,
    DashboardSidebarComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService, NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
