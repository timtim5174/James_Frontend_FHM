import { MembersComponent } from './members.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../user/user.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SharedUserService } from '../../user/shared-user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserInfo } from '../../user/user';
import { Observable } from 'rxjs';

describe('MembersComponent', () => {
  let membersComponent: MembersComponent;
  let sanitizer: DomSanitizer; // tslint:disable-line
  beforeAll(() => {
    membersComponent = new MembersComponent(new NgbActiveModal(),
    new MockUserService(new HttpClient({} as HttpHandler), new SharedUserService()), sanitizer);
  });

  it('should set user img to undefined when user has no image', () => {
    const users: UserInfo[] = [];
    users.push({id: '1', firstname: 'John', lastname: 'Doe'});
    users.push({id: '2', firstname: 'Harry', lastname: 'Hacker'});
    membersComponent.modalInput = users;
    membersComponent.ngOnInit();
    expect(users[0].img).toBeUndefined();
    expect(users[1].img).toBeUndefined();

  });
});

class MockUserService extends UserService {

  getUserInfoImage(userId: string) {
    return new Observable<null>(); // java server returns null when no image exists
  }
}
