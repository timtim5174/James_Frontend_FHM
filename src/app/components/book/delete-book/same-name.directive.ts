import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appSameName]',
  providers: [{ provide: NG_VALIDATORS, useExisting: SameNameDirective, multi: true }]
})
export class SameNameDirective implements Validator {
  @Input() bookTitle: string;
  constructor() { }

  validate(c: AbstractControl): { [key: string]: any; } {
    if (c.value && c.value !== this.bookTitle) {
      return { 'appSameName': this.bookTitle };
    } else {
      return null;
    }
  }

}
