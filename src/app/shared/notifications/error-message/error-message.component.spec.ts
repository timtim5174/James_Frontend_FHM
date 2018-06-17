import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessageComponent } from './error-message.component';
import { NgModel } from '@angular/forms';

describe('ErrorMessageComponent', () => {
  let errorMessageComponent: ErrorMessageComponent;
  let errorMessage: String;
  let error: String;
  beforeAll(() => {
    errorMessageComponent = new ErrorMessageComponent();
    errorMessage = 'Test Error Message';
    error = 'Test Error';
  });

  it('should return the correct setted values', () => {
    errorMessageComponent.error = 'Test Error';
    errorMessageComponent.message = 'Test Error Message';
    expect(errorMessageComponent.error).toBe(error);
    expect(errorMessageComponent.message).toBe(errorMessage);
  });
});
