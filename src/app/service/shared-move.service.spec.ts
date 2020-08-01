import { TestBed } from '@angular/core/testing';

import { SharedMoveService } from './shared-move.service';

describe('SharedMoveService', () => {
  let service: SharedMoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedMoveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
