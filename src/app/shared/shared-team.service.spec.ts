import { TestBed } from '@angular/core/testing';

import { SharedTeamService } from './shared-team.service';

describe('SharedTeamService', () => {
  let service: SharedTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
