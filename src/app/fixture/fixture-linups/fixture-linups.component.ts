import { FixtureService } from './../../services/fixture.service';
import { Component, OnInit } from '@angular/core';
import { Fixture } from 'src/app/models/fixture';
import { SharedFixtureService } from 'src/app/shared/shared-fixture.service';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-fixture-linups',
  templateUrl: './fixture-linups.component.html',
  styleUrls: ['./fixture-linups.component.scss'],
})
export class FixtureLinupsComponent implements OnInit {

  fixture: Fixture;
  selectedTeam: string;
  linupDetails: any;
  linupGraph: any;
  constructor(private sharedFixture: SharedFixtureService, private fixtureService: FixtureService) {
    this.fixture = sharedFixture.getData();
    this.linupGraph = undefined;
  }

  ngOnInit() {
    this.linupDetails = this.fixtureService.fetchLinups(this.fixture.id);
  }

  parseLinup(formation, players): boolean {
    try {
      this.linupGraph = new Array<Array<Player>>();
      let pi = 0;
      let row = new Array<Player>();
      row.push(players[pi++]);
      this.linupGraph.push(row);
      let sum=1;
      for(let i of formation) {
        if(sum == 11)
          break;
        if(!isFinite(i))
          continue;
        let cnt = Number(i);
        sum += cnt;
        row = new Array<Player>();
        for(let j=0; j<cnt; j++) {
          row.push(players[pi++]);
        }
        this.linupGraph.push(row);
      }

      return true;
    } catch (error) {
      this.linupGraph = undefined;
      return false;
    }
  }

}
