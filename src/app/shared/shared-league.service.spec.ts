import { TestBed } from '@angular/core/testing';

import { SharedLeagueService } from './shared-league.service';

describe('SharedLeagueService', () => {
  let service: SharedLeagueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedLeagueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
