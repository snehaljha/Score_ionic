import { SharedLeagueService } from './../../shared/shared-league.service';
import { FixtureService } from './../../services/fixture.service';
import { Fixture } from './../../models/fixture';
import { Component, OnInit } from '@angular/core';
import { SharedFixtureService } from 'src/app/shared/shared-fixture.service';
import { League } from 'src/app/models/league';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fixture-others',
  templateUrl: './fixture-others.component.html',
  styleUrls: ['./fixture-others.component.scss'],
})
export class FixtureOthersComponent implements OnInit {

  fixture: Fixture;
  facts: any;
  h2hfixtures: Array<Fixture>;
  prevTitle: string;

  constructor(private sharedFixture: SharedFixtureService, fixtureService: FixtureService,
    private sharedLeague: SharedLeagueService, private router: Router) {
    this.fixture = sharedFixture.getData();
    this.facts = fixtureService.fetchFacts(this.fixture.id);
    fixtureService.fetchRawCustomId(this.fixture.id).subscribe(data => {
      const customId = data['event']['customId'];
      this.h2hfixtures = fixtureService.fetchH2H(customId);
    });
    this.prevTitle = '';
  }

  ngOnInit() {}

  isTitleNeeded(title: string) {

    if(title === this.prevTitle)
      {return false;}
    this.prevTitle = title;
    return true;
  }

  gotoLeague(category: League) {
    this.sharedLeague.setData(category);
    this.router.navigate(['league']);
  }


}
