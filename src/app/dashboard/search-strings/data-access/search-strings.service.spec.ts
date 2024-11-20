import { TestBed } from '@angular/core/testing';

import { SearchStringsService } from './search-strings.service';

describe('SearchStringsService', () => {
  let service: SearchStringsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchStringsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
