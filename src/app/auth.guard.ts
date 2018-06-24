import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './components/user/user.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { SharedUserService } from './components/user/shared-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService, private modalService: NgbModal) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.userService.isAuthenticated) {
      return true;
    } else {
      const modalRef = this.modalService.open(SignInComponent, { centered: true });
      modalRef.componentInstance.authGuardRedirect = state.url;
      return false;
    }
  }
}
