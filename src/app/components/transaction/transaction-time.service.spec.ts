import { TestBed, inject } from '@angular/core/testing';

import { TransactionTimeService } from './transaction-time.service';

describe('TransactionTimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionTimeService]
    });
  });

  it('should be created', inject([TransactionTimeService], (service: TransactionTimeService) => {
    expect(service).toBeTruthy();
  }));
});
