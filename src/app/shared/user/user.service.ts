import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError as _throw } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http/src/response';
import { User } from './user';


@Injectable()
export class UserService {
  private baseURL = window.location.origin + '/JamesBackend-web/api/v1/boarding';
  isAuthenticated: boolean;
  userData: User;
  private options = {withCredentials: true};

  constructor(private http: HttpClient) { }

  signUp(accountData: User) {
    this.isAuthenticated = false;
    return this.http.post(this.baseURL + '/registry', accountData, this.options).pipe(
      map(data => this.isAuthenticated = true),
      catchError(this.handleError)
    );
  }

  signIn(authData: Partial<User>) {
    this.isAuthenticated = false;
    return this.http.post(this.baseURL + '/login', authData, this.options).pipe(
      map(data => this.isAuthenticated = true),
      catchError(this.handleError)
    );
  }

  signOut() {
    this.isAuthenticated = false;
  }

  getUserData() {
    return this.http.get(this.baseURL + '/userData', this.options).pipe(
      map(data => this.userData = data as User),
      catchError(this.handleError)
    );
  }

  updateUser(user: User) {

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
