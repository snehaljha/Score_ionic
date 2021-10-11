import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Contants } from '../models/contants';
import { Fixture } from '../models/fixture';

@Injectable({
  providedIn: 'root'
})
export class LiveFixturesService {

  constructor(private http: HttpClient) { }

  fetch() {
    let response = this.http.get(Contants.liveMatches);
    let fixtures = new Array<Fixture>();
    response.subscribe(data => {
      let parsed = data['events'];
      for(let i in parsed) {
        if(parsed[i]['tournament']['uniqueTournament'] != null) {
          fixtures.push(new Fixture(parsed[i], new Category(parsed[i]['tournament']['uniqueTournament'])))
        } else {
          fixtures.push(new Fixture(parsed[i], new Category(parsed[i]['tournament']['category'])))
        }
      }
    });

    return fixtures;
  }
}
