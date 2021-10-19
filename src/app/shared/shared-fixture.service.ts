import { Injectable } from '@angular/core';
import { Fixture } from '../models/fixture';
import { League } from '../models/league';

@Injectable({
  providedIn: 'root'
})
export class SharedFixtureService {

  fixture: Fixture;
  constructor() {}

  getData() {
    return this.fixture;
  }

  setData(fixture: Fixture) {
    this.fixture = fixture;
  }
}
