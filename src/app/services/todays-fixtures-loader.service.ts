import { Fixture } from './../models/fixture';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contants } from '../models/contants';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class TodaysFixturesLoaderService {

  private map: Map<string, Array<Fixture>>;

  private date: string;
  constructor(private http: HttpClient) {
    this.map = new Map();
    let today = new Date();
    let yyyy = String(today.getFullYear());
    let mm = String(today.getMonth()+1).padStart(2, '0');
    let dd = String(today.getDate()).padStart(2, '0');
    this.date = yyyy+'-'+mm+'-'+dd;
  }

  fetch() {
    if(this.map.has(this.date))
      return this.map.get(this.date);
    let response = this.http.get(Contants.fixtureByDate.replace('yyyy-mm-dd', this.date));
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
    this.map.set(this.date, fixtures);
    return fixtures;
    
  }
}
