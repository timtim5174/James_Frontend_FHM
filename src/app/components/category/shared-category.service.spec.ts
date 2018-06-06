import { TestBed, inject } from '@angular/core/testing';

import { SharedCategoryService } from './shared-category.service';

xdescribe('SharedCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedCategoryService]
    });
  });

  it('should be created', inject([SharedCategoryService], (service: SharedCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
