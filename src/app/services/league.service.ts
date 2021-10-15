import { Team } from './../models/team';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contants } from '../models/contants';
import { Season } from '../models/season';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  constructor(private http: HttpClient) { }

  fetchChamps(id: number) {
    const url = Contants.leagueOverview.replace('{league_id}', id.toString());
    const response = this.http.get(url);
    const res: Array<any> = new Array();
    response.subscribe(data => {
      const newLocal = 'uniqueTournament';
      const parsed = data[newLocal];
      let detail = parsed.titleHolder;
      res.push(new Team(detail));
      detail = parsed.titleHolderTitles;
      res.push(detail);
      detail = parsed.mostTitlesTeams[0];
      res.push(new Team(detail));
      detail = parsed.mostTitles;
      res.push(detail);
    });
    return res;
  }

  fetchSeasons(id: number) {
    const url = Contants.seasons.replace('{league_id}', id.toString());
    const response = this.http.get(url);
    const res: Array<Season> = new Array();
    response.subscribe(data => {
      const newLocal = 'seasons';
      const parsed = data[newLocal];
      for(const i of parsed) {
        res.push(new Season(i));
      }
    });
    return res;
  }
}
