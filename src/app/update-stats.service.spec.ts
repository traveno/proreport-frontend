import { TestBed } from '@angular/core/testing';

import { UpdateStatsService } from './update-stats.service';

describe('UpdateStatsService', () => {
  let service: UpdateStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
