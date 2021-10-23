import { TestBed } from '@angular/core/testing';

import { MyFixturesLoaderService } from './my-fixtures-loader.service';

describe('MyFixturesLoaderService', () => {
  let service: MyFixturesLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyFixturesLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
