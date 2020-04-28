import { TestBed } from '@angular/core/testing';

import { StockRepoService } from './stock-repo.service';

describe('StockRepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockRepoService = TestBed.get(StockRepoService);
    expect(service).toBeTruthy();
  });
});
