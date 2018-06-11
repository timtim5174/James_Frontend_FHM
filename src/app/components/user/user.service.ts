import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseContentType } from '@angular/http';

import { Observable, of, throwError as _throw, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http/src/response';
import { User, UserInfo } from './user';
import { SharedUserService } from './shared-user.service';


@Injectable()
export class UserService {
  private baseURL = window.location.origin + '/JamesBackend-web/api/v1/boarding';
  isAuthenticated: boolean;


  private options = { withCredentials: true };
  userData: User;
  response: object;

  constructor(private http: HttpClient, private sharedUserService: SharedUserService) { }

  signUp(accountData: User): Observable<User> {
    this.isAuthenticated = false;
    return this.http.post<User>(this.baseURL + '/registry', accountData, this.options).pipe(
      map(data => {
        this.isAuthenticated = true;
        this.sharedUserService.setAuthentificationStatus(true);
      }
      ),
      catchError(this.handleError)
    );
  }

  signIn(authData: Partial<User>) {
    this.isAuthenticated = false;
    return this.http.post<Partial<User>>(this.baseURL + '/login', authData, this.options).pipe(
      map(data => {
        this.isAuthenticated = true;
        this.sharedUserService.setAuthentificationStatus(true);
      }
      ),
      catchError(this.handleError)
    );
  }

  signOut() {
    this.isAuthenticated = false;
    this.sharedUserService.setAuthentificationStatus(false);
    document.cookie = 'jwt-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  deleteUser(pw: string): Observable<any> {
    return this.http.delete<User>(this.baseURL + `/deleteUser/${pw}`).pipe(
      catchError(this.handleError)
    );
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

  getUserInfoImage(userId: string) {
    return this.http.get(this.baseURL + `/getUserInfoImage/${userId}`, { responseType: 'blob' }).pipe(
      map(data => this.response = data),
      catchError(this.handleError));
  }

  getUsersOfBook(id: string): Observable<UserInfo[]> {
    return this.http.get(this.baseURL + `/getUsersOfBook/${id}`, this.options).pipe(
      map(data => this.response = data),
      catchError(this.handleError)
    );
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
