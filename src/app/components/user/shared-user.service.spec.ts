import { TestBed, inject } from '@angular/core/testing';

import { SharedUserService } from './shared-user.service';

describe('SharedUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedUserService]
    });
  });

  it('should be created', inject([SharedUserService], (service: SharedUserService) => {
    expect(service).toBeTruthy();
  }));
});
