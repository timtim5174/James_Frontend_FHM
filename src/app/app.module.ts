import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { EqualPasswordsDirective } from './components/sign-up/equal-passwords.directive';
import { EmailDirective } from './shared/authentication/email.directive';
import { PasswordDirective } from './shared/authentication/password.directive';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { StandardNotificationComponent } from './shared/notifications/standard-notification/standard-notification.component';
import { DateDirective } from './shared/authentication/date.directive';
import { DatepickerComponent } from './shared/datepicker/datepicker.component';



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
    DatepickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
