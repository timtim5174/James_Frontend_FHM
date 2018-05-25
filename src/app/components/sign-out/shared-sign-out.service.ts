import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedSignOutService {
  @Output() errorMessage = new EventEmitter<string>();
  constructor() { }

}
