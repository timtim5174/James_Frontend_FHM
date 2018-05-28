import { TestBed, inject } from '@angular/core/testing';

import { BookDataService } from './shared-book.service';

describe('BookDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookDataService]
    });
  });

  it('should be created', inject([BookDataService], (service: BookDataService) => {
    expect(service).toBeTruthy();
  }));
});
