import { TestBed } from '@angular/core/testing';

import { LeaguesListService } from './leagues-list.service';

describe('LeaguesListService', () => {
  let service: LeaguesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaguesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
