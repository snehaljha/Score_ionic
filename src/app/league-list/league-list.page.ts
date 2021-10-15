import { LeaguesListService } from './../services/leagues-list.service';
import { Category } from './../models/category';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { League } from '../models/league';
import { SharedLeagueService } from '../shared/shared-league.service';

@Component({
  selector: 'app-league-list',
  templateUrl: './league-list.page.html',
  styleUrls: ['./league-list.page.scss'],
})
export class LeagueListPage implements OnInit {

  category: Category;
  leagues: Array<League>;
  // eslint-disable-next-line max-len
  constructor(private route: ActivatedRoute, private router: Router, private leaguesListService: LeaguesListService, private sharedLeagueService: SharedLeagueService) {
    this.route.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state) {
        this.category = this.router.getCurrentNavigation().extras.state.category;
      }
    });
  }

  ngOnInit() {
    this.leagues = this.leaguesListService.fetch(this.category.id);
  }

  onClick(league: League) {
    this.sharedLeagueService.setData(league);
    this.router.navigate(['league']);
  }

}
