import { TestBed } from '@angular/core/testing';

import { MoveDetailsService } from './move-details.service';

describe('MoveDetailsService', () => {
  let service: MoveDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoveDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
