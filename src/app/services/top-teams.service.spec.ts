import { TestBed } from '@angular/core/testing';

import { TopTeamsService } from './top-teams.service';

describe('TopTeamsService', () => {
  let service: TopTeamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopTeamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
