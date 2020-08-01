import { TestBed } from '@angular/core/testing';

import { SharedMoveDetailsService } from './shared-move-details.service';

describe('SharedMoveDetailsService', () => {
  let service: SharedMoveDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedMoveDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
