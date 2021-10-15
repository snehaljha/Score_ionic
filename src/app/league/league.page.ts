import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { League } from '../models/league';
import { SharedLeagueService } from '../shared/shared-league.service';

@Component({
  selector: 'app-league',
  templateUrl: './league.page.html',
  styleUrls: ['./league.page.scss'],
})
export class LeaguePage implements OnInit {

  title: string;
  constructor(private sharedLeagueService: SharedLeagueService) {
    this.title = sharedLeagueService.getData().name;
  }

  ngOnInit() {
  }

}
