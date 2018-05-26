import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseContentType } from '@angular/http';

import { Observable, of, throwError as _throw, BehaviorSubject} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http/src/response';
import { User } from './user';


@Injectable()
export class UserService {
  private baseURL = window.location.origin + '/JamesBackend-web/api/v1/boarding';
  isAuthenticated: boolean;
  $changeAuthenticationStatus = new BehaviorSubject<boolean>(false);
  $imgSubject = new BehaviorSubject<object>(null);

  private options = { withCredentials: true };
  userData: User;
  response: object;

  constructor(private http: HttpClient) { }

  signUp(accountData: User) {
    this.isAuthenticated = false;
    return this.http.post(this.baseURL + '/registry', accountData, this.options).pipe(
      map(data => this.setIsAuthenticatedTrue()),
      catchError(this.handleError)
    );
  }

  signIn(authData: Partial<User>) {
    this.isAuthenticated = false;
    return this.http.post(this.baseURL + '/login', authData, this.options).pipe(
      map(data => this.setIsAuthenticatedTrue()),
      catchError(this.handleError)
    );
  }

  signOut() {
    this.setIsAuthenticatedFalse();
    document.cookie = 'jwt-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }


  getUserData() {
    return this.http.get(this.baseURL + '/userData', this.options).pipe(
      map(data => this.userData = data as User),
      catchError(this.handleError)
    );
  }

  updateUser(user: User) {
    delete user.passwordCheck;
    return this.http.patch(this.baseURL + '/updateUser', user, this.options).pipe(
      map(data => this.response = data),
      catchError(this.handleError)
    );
  }

  uploadFile(file: FormData) {
    return this.http.post(this.baseURL + '/uploadFile', file, this.options).pipe(
      map(data => this.response = data),
      catchError(this.handleError));
  }

  getImageFile() {
    return this.http.get(this.baseURL + '/getImageFile', {responseType: 'blob'}).pipe(
      map(data => this.response = data),
      catchError(this.handleError));
  }

  setIsAuthenticatedTrue() {
    this.isAuthenticated = true;
    this.giveChangeAuthenticationStatus(true);
  }

  setUserImage(img: object) {
    this.$imgSubject.next(img);
  }

  getUserImage(): Observable<object> {
    return this.$imgSubject.asObservable();
  }

  setIsAuthenticatedFalse() {
    this.isAuthenticated = false;
    this.giveChangeAuthenticationStatus(false);
  }

  getChangeAuthenticationStatus(): Observable<boolean> {
    return this.$changeAuthenticationStatus.asObservable();
  }

  giveChangeAuthenticationStatus(status: boolean) {
    this.$changeAuthenticationStatus.next(status);
}

  private handleError(error: HttpErrorResponse): Observable<any> {
    let msg: string;
    if (error.error) {
      msg = error.error;
    } else if (error.message) {
      msg = error.message;
    } else {
      msg = `${error.status} - ${error.statusText || ''}`;
    }
    return _throw(msg);
  }

}
