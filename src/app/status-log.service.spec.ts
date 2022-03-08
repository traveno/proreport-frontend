import { TestBed } from '@angular/core/testing';

import { StatusLogService } from './status-log.service';

describe('StatusLogService', () => {
  let service: StatusLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
