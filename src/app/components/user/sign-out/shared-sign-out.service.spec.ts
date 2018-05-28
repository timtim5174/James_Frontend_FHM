import { TestBed, inject } from '@angular/core/testing';

import { SharedSignOutService } from './shared-sign-out.service';

describe('SharedSignOutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedSignOutService]
    });
  });

  it('should be created', inject([SharedSignOutService], (service: SharedSignOutService) => {
    expect(service).toBeTruthy();
  }));
});
