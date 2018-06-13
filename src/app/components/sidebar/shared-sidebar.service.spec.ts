import { TestBed, inject } from '@angular/core/testing';

import { SharedSidebarService } from './shared-sidebar.service';

describe('SharedSidebarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedSidebarService]
    });
  });

  it('should be created', inject([SharedSidebarService], (service: SharedSidebarService) => {
    expect(service).toBeTruthy();
  }));
});
