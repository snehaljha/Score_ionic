import { TestBed } from '@angular/core/testing';

import { LiveFixturesService } from './live-fixtures.service';

describe('LiveFixturesService', () => {
  let service: LiveFixturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveFixturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
