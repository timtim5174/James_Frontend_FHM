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
    console.log('sharedUserService SET: ', status);
    this.changeAuthenticationStatus.next(status);
  }

  getAuthentificationStatus(): Observable<boolean> {
    console.log('sharedUserService GET: ', this.changeAuthenticationStatus.asObservable());
    return this.changeAuthenticationStatus.asObservable();
  }

  setUserImage(img: object) {
    this.imgSubject.next(img);
  }

  getUserImage(): Observable<object> {
    return this.imgSubject.asObservable();
  }
}
