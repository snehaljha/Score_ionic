import { FavouriteService } from './favourite.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contants } from '../models/contants';
import { Fixture } from '../models/fixture';
import { League } from '../models/league';

@Injectable({
  providedIn: 'root'
})
export class MyFixturesLoaderService {

  private map: Map<string, Array<Fixture>>;

  private date: string;
  private tomorrow: string;
  private yesterday: string;
  constructor(private http: HttpClient, private favouriteService: FavouriteService) {
    this.map = new Map();
    const today = new Date();
    const td = new Date(today.getTime()+24*60*60*1000);
    const yd = new Date(today.getTime()-24*60*60*1000);
    let yyyy = String(today.getFullYear());
    let mm = String(today.getMonth()+1).padStart(2, '0');
    let dd = String(today.getDate()).padStart(2, '0');
    this.date = yyyy+'-'+mm+'-'+dd;
    yyyy = String(yd.getFullYear());
    mm = String(yd.getMonth()+1).padStart(2, '0');
    dd = String(yd.getDate()).padStart(2, '0');
    this.yesterday = yyyy+'-'+mm+'-'+dd;
    yyyy = String(td.getFullYear());
    mm = String(td.getMonth()+1).padStart(2, '0');
    dd = String(td.getDate()).padStart(2, '0');
    this.tomorrow = yyyy+'-'+mm+'-'+dd;
  }

  fetch() {
    if(this.map.has(this.date))
      {return this.map.get(this.date);}
    const response = this.http.get(Contants.fixtureByDate.replace('yyyy-mm-dd', this.date));
    const fixtures = new Array<Fixture>();
    const set = new Set();
    response.subscribe(async data => {
      const newLocal = 'events';
      const parsed = data[newLocal];
      for(const i in parsed) {
        let fixture: Fixture;
        if(parsed[i].tournament.uniqueTournament != null) {
          fixture = new Fixture(parsed[i], new League(parsed[i].tournament.uniqueTournament));
        } else {
          fixture = new Fixture(parsed[i], new League(parsed[i].tournament.category));
        }
        let homeFav : boolean = await this.favouriteService.contains(fixture.homeTeam);
        let awayFav: boolean = await this.favouriteService.contains(fixture.awayTeam);
        if((homeFav || awayFav) && !set.has(fixture.id)) {
          set.add(fixture.id);
          fixtures.push(fixture);
        }
      }

      const url = Contants.fixtureByDate.replace('yyyy-mm-dd', this.yesterday)
      this.http.get(url).subscribe(async data => {
        const newLocal = 'events';
        const parsed = data[newLocal];
        for(const i in parsed) {
          let fixture: Fixture;
          if(parsed[i].tournament.uniqueTournament != null) {
            fixture = new Fixture(parsed[i], new League(parsed[i].tournament.uniqueTournament));
          } else {
            fixture = new Fixture(parsed[i], new League(parsed[i].tournament.category));
          }
          let homeFav : boolean = await this.favouriteService.contains(fixture.homeTeam);
        let awayFav: boolean = await this.favouriteService.contains(fixture.awayTeam);
        if((homeFav || awayFav) && !set.has(fixture.id)) {
            set.add(fixture.id);
            fixtures.push(fixture);
          }
        }

        const url = Contants.fixtureByDate.replace('yyyy-mm-dd', this.tomorrow)
        this.http.get(url).subscribe(async data => {
          const newLocal = 'events';
          const parsed = data[newLocal];
          for(const i in parsed) {
            let fixture: Fixture;
            if(parsed[i].tournament.uniqueTournament != null) {
              fixture = new Fixture(parsed[i], new League(parsed[i].tournament.uniqueTournament));
            } else {
              fixture = new Fixture(parsed[i], new League(parsed[i].tournament.category));
            }
        let homeFav : boolean = await this.favouriteService.contains(fixture.homeTeam);
        let awayFav: boolean = await this.favouriteService.contains(fixture.awayTeam);
        if((homeFav || awayFav) && !set.has(fixture.id)) {
              set.add(fixture.id);
              fixtures.push(fixture);
            }
          }          
          fixtures.sort((a: Fixture, b: Fixture) => {
            if(a.league.userCount > b.league.userCount)
              return -1;
            if(a.league.userCount < b.league.userCount)
              return 1;
            if(a.startTimeStamp < b.startTimeStamp)
              {return -1;}
            if(a.startTimeStamp > b.startTimeStamp)
              {return 1;}
            const pa = a.homeTeam.userCount + a.awayTeam.userCount;
            const pb = b.awayTeam.userCount + b.homeTeam.userCount;
            if(pa > pb)
              {return -1;}
            if(pa < pb)
              {return 1;}
            return 0;
          });
        });

      });
    });
    this.map.set(this.date, fixtures);
    return fixtures;

  }
}
