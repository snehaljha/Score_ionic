import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { League } from 'src/app/models/league';

@Component({
  selector: 'app-league-fixtures',
  templateUrl: './league-fixtures.component.html',
  styleUrls: ['./league-fixtures.component.scss'],
})
export class LeagueFixturesComponent implements OnInit {

  league: League;
  constructor() {}

  ngOnInit() {}

}
