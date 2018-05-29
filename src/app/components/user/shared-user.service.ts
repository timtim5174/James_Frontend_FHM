import { Injectable } from '@angular/core';
import { Observable, of, throwError as _throw, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedUserService {
  authentificationStatus = new BehaviorSubject<boolean>(false);
  constructor() { }

  setAuthentificationStatus(aut: boolean) {
    this.authentificationStatus.next(aut);
  }

  getAuthentificationStatus(): Observable<boolean> {
    return this.authentificationStatus.asObservable();
  }
}
