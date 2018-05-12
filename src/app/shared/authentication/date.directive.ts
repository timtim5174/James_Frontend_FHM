import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appDate]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DateDirective, multi: true }]
})
export class DateDirective {

  constructor() { }
  validate(c: AbstractControl): { [key: string]: any; } {
    const re = /^(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/i;
    if (!c.value || re.test(c.value)) {
      return null;
    } else {
      return { 'appDate': { value: c.value } };
    }
  }
}
