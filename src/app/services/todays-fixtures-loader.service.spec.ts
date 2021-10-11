import { TestBed } from '@angular/core/testing';

import { TodaysFixturesLoaderService } from './todays-fixtures-loader.service';

describe('TodaysFixturesLoaderService', () => {
  let service: TodaysFixturesLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodaysFixturesLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
