import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { SignOutComponent } from './components/user/sign-out/sign-out.component';
import { EqualPasswordsDirective } from './components/user/authentication/equal-passwords.directive';
import { EmailDirective } from './components/user/authentication/email.directive';
import { PasswordDirective } from './components/user/authentication/password.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { StandardNotificationComponent } from './shared/notifications/standard-notification/standard-notification.component';
import { DateDirective } from './components/user/authentication/date.directive';
import { DatepickerComponent } from './shared/datepicker/datepicker.component';
import { DataPrivacyComponent } from './components/data-privacy/data-privacy.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { ContactComponent } from './components/contact/contact.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownComponent } from './shared/dropdown/dropdown.component';
import { MyAccountComponent } from './components/user/my-account/my-account.component';
import { ModalComponent } from './shared/modal/modal.component';
import { ErrorMessageComponent } from './shared/notifications/error-message/error-message.component';
import { UserService } from './components/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertCloseableComponent } from './shared/notifications/alert-closeable/alert-closeable.component';
import { MainComponent } from './components/main/main.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookSidebarComponent } from './components/book/book-sidebar/book-sidebar.component';
import { CreateBookComponent } from './components/book/create-book/create-book.component';
import { DashboardMainComponent } from './components/dashboard/dashboard-main/dashboard-main.component';
import { UpdateBookComponent } from './components/book/update-book/update-book.component';
import { MapBookDatesPipe } from './components/book/map-book-dates.pipe';
import { BookViewComponent } from './components/book/book-view/book-view.component';
import { DeleteBookComponent } from './components/book/delete-book/delete-book.component';
import { SameNameDirective } from './components/book/delete-book/same-name.directive';
import { TransactionOverviewComponent } from './components/transaction/transaction-overview/transaction-overview.component';
import { BookStatisticsComponent } from './components/book/book-statistics/book-statistics.component';
import { DashboardMainWidgetComponent } from './components/dashboard/dashboard-main-widget/dashboard-main-widget.component';
import { SharedBookService } from './components/book/shared-book.service';
import { SharedUserService } from './components/user/shared-user.service';
import { BookInfoComponent } from './components/book/book-info/book-info.component';
import { LineGraphComponent } from './shared/graphs/line-graph/line-graph.component';

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
    CreateBookComponent,
    DashboardMainComponent,
    UpdateBookComponent,
    MapBookDatesPipe,
    BookViewComponent,
    DeleteBookComponent,
    SameNameDirective,
    TransactionOverviewComponent,
    BookStatisticsComponent,
    DashboardMainWidgetComponent,
    BookInfoComponent,
    LineGraphComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService, NgbActiveModal, SharedBookService, SharedUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
