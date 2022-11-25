import { TestBed } from '@angular/core/testing';

import { GradePeriodService } from './grade-period.service';

describe('GradePeriodService', () => {
  let service: GradePeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradePeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
