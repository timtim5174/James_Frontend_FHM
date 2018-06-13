import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User, UserInfo } from './user';

@Injectable({
  providedIn: 'root'
})
export class SharedUserService {
  changeAuthenticationStatus = new BehaviorSubject<boolean>(false);
  imgSubject = new BehaviorSubject<object>(null);
  signOutSubject = new BehaviorSubject<string>(null);
  userForBookSubject = new BehaviorSubject<UserInfo[]>(null);

  constructor() { }

  setAuthentificationStatus(status: boolean) {
    this.changeAuthenticationStatus.next(status);
  }

  getAuthentificationStatus(): Observable<boolean> {
    return this.changeAuthenticationStatus.asObservable();
  }

  setUserImage(img: object) {
    this.imgSubject.next(img);
  }

  getUserImage(): Observable<object> {
    return this.imgSubject.asObservable();
  }

  setSignOutSubject(message: string) {
    this.signOutSubject.next(message);
  }

  getSignOutSubject(): Observable<string> {
    return this.signOutSubject.asObservable();
  }

  setUserForBookSubject(user: UserInfo[]) {
    this.userForBookSubject.next(user);
  }

  getUserForBookSubject(): Observable<UserInfo[]> {
    return this.userForBookSubject.asObservable();
  }
}
