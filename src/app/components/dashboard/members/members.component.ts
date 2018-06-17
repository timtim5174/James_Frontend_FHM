import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UserInfo, User } from '../../user/user';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  usersInfoData: UserInfo[];
  @Input() modalInput: UserInfo[];
  constructor(public activeModal: NgbActiveModal, private userService: UserService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.usersInfoData = this.modalInput;
    this.setUsersImage(this.usersInfoData);
  }

  async setUsersImage(users: UserInfo[]) {
    for (const user of users) {
      const data = await this.userService.getUserInfoImage(user.id).toPromise();
      if (data != null) {
        user.img = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data));
      }
    }
  }
}
