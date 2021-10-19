import { TestBed } from '@angular/core/testing';

import { SharedFixtureService } from './shared-fixture.service';

describe('SharedFixtureService', () => {
  let service: SharedFixtureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedFixtureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
