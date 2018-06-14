import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedSidebarService {
  selectedIcon: 'book' | 'dashboard';

  constructor() { }

  setSelectedIcon(value: 'book' | 'dashboard') {
    this.selectedIcon = value;
  }
}




