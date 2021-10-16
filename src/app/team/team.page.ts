import { SharedTeamService } from './../shared/shared-team.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

  title: string

  constructor(sharedTeam: SharedTeamService) {
    this.title = sharedTeam.getData().name;
  }

  ngOnInit() {
  }

}
