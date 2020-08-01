import { TestBed } from '@angular/core/testing';

import { BoxDetailsService } from './box-details.service';

describe('BoxDetailsService', () => {
  let service: BoxDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoxDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
