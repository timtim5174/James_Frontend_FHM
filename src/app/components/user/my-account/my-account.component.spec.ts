import { MyAccountComponent } from './my-account.component';
import { UserService } from '../user.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SharedUserService } from '../shared-user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../user';

class MockUserService extends UserService {

  getUserData() {
    return new Observable<User>(observer => {
      observer.next({
        firstname: 'Harry',
        lastname: 'Hacker',
        email: 'harry@hacker.de',
        password: 'test1234',
        birth: new Date()
      });
    });
  }
}

class MockSharedUserService extends SharedUserService {

  getUserImage() {
    return new Observable<null>(observer => {
      observer.next(null);
    });
  }
}

describe('MyAccountComponent', () => {
  let myAccountComponent: MyAccountComponent;
  let userService: UserService;
  let sharedUserService: SharedUserService;
  let sanitzier: DomSanitizer; // tslint:disable-line
  let router: Router; // tslint:disable-line

  beforeAll(() => {
    userService = new MockUserService(new HttpClient({} as HttpHandler), new SharedUserService());
    sharedUserService = new MockSharedUserService();
    myAccountComponent = new MyAccountComponent(userService, sharedUserService, sanitzier, router);

  });

  it('should save changed year in user property', () => {
    myAccountComponent.onSaveDate({
      year: new Date(new Date().setFullYear(2000)).getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate()
    });
    expect(myAccountComponent.user.birth.getFullYear()).toBe(2000);

  });

  it('should reset password variables on passwordChange() call', () => {
    myAccountComponent.isPasswordChanged = false;
    myAccountComponent.newPassword = 'test';
    myAccountComponent.verifyPassword = 'test';
    myAccountComponent.passwordChange();
    expect(myAccountComponent.isPasswordChanged).toBe(true);
    expect(myAccountComponent.newPassword).toBe('');
    expect(myAccountComponent.verifyPassword).toBe('');

  });

  it('should update user infos successfully', () => {
    const spyUpdateUser = spyOn(userService, 'updateUser').and.returnValue(new Observable<object>(observer => {
      observer.next({ message: 'Update successful' });
    }));
    const spyShowResponse = spyOn(myAccountComponent, 'showResponse').and.callFake(() => {
      myAccountComponent.alertStyle = 'success';
    });
    myAccountComponent.isPasswordChanged = true;
    myAccountComponent.newPassword = 'test1235';
    myAccountComponent.onSave();
    expect(myAccountComponent.alertStyle).toBe('success');

  });

  it('should update user infos with error', () => {
    const spyUpdateUser = spyOn(userService, 'updateUser').and.returnValue(new Observable<object>(observer => {
      observer.error();
    }));
    const spyShowResponse = spyOn(myAccountComponent, 'showResponse').and.callFake(() => {
      myAccountComponent.alertStyle = 'danger';
    });
    myAccountComponent.onSave();
    expect(myAccountComponent.alertStyle).toBe('danger');

  });
});
