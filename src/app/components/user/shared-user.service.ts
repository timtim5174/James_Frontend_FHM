import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedUserService {
  changeAuthenticationStatus = new BehaviorSubject<boolean>(false);
  imgSubject = new BehaviorSubject<object>(null);

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
}
