import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseContentType } from '@angular/http';

import { Observable, of, throwError as _throw, BehaviorSubject} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http/src/response';
import { User } from './user';
import { SharedUserService } from './shared-user.service';


@Injectable()
export class UserService {
  private baseURL = window.location.origin + '/JamesBackend-web/api/v1/boarding';
  isAuthenticated: boolean;
  $changeAuthenticationStatus = new BehaviorSubject<boolean>(false);
  $imgSubject = new BehaviorSubject<object>(null);

  private options = { withCredentials: true };
  userData: User;
  response: object;

  constructor(private http: HttpClient, private sharedUserService: SharedUserService) { }

  signUp(accountData: User): Observable<User> {
    this.isAuthenticated = false;
    return this.http.post<User>(this.baseURL + '/registry', accountData, this.options).pipe(
      map(data => this.setIsAuthenticatedTrue(),
      this.sharedUserService.setAuthentificationStatus(true)
      ),
      catchError(this.handleError)
    );
  }

  signIn(authData: Partial<User>) {
    this.isAuthenticated = false;
    return this.http.post<Partial<User>>(this.baseURL + '/login', authData, this.options).pipe(
      map(data => this.setIsAuthenticatedTrue(),
      this.sharedUserService.setAuthentificationStatus(true)
      ),
      catchError(this.handleError)
    );
  }

  signOut() {
    this.setIsAuthenticatedFalse();
    this.sharedUserService.setAuthentificationStatus(false);
    document.cookie = 'jwt-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }


  getUserData(): Observable<User> {
    return this.http.get<User>(this.baseURL + '/userData', this.options).pipe(
      map(data => this.userData = data as User),
      catchError(this.handleError)
    );
  }

  updateUser(user: User) {
    delete user.passwordCheck;
    return this.http.patch<User>(this.baseURL + '/updateUser', user, this.options).pipe(
      map(data => this.response = data),
      catchError(this.handleError)
    );
  }

  uploadUserImage(file: FormData) {
    return this.http.post<FormData>(this.baseURL + '/uploadUserImage', file, this.options).pipe(
      map(data => this.response = data),
      catchError(this.handleError));
  }

  receiveUserImage() {
    return this.http.get(this.baseURL + '/getUserImage', { responseType: 'blob' }).pipe(
      map(data => this.response = data),
      catchError(this.handleError));
  }

  getUsersOfBook(id: string) {
    return this.http.get(this.baseURL + `/getUsersOfBook/${id}`, this.options).pipe(
      map(data => this.response = data),
      catchError(this.handleError)
    );
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
