import { Category } from './category';
import { Contants } from './contants';
import { FixtureScore } from './fixture-score';
import { League } from './league';
import { Team } from './team';
export class Fixture {

    league: League;
    statusCode: number;
    homeTeam: Team;
    awayTeam: Team;
    homeScore: FixtureScore;
    awayScore: FixtureScore;
    id: number;
    startTimeStamp: number;

    constructor(response, league: League) {
        this.league = league;
        this.statusCode = response['status']['code'];
        this.homeTeam = new Team(response['homeTeam']);
        this.awayTeam = new Team(response['awayTeam']);
        this.id = response['id'];
        this.startTimeStamp = response['startTimestamp'];
        if(this.isScoreNeeded())
            this.homeScore = new FixtureScore(response['homeScore']);
        if(response.awayScore != null)
            this.awayScore = new FixtureScore(response['awayScore']);
    }

    getCurrentScore() {
        if(this.homeScore == null || this.homeScore == undefined || this.awayScore == null || this.awayScore == undefined)
            return '-';
        return this.homeScore.current + ' - ' + this.awayScore.current;
    }

    isScoreNeeded() {
        return !(this.statusCode == 0 || this.statusCode == 70);
    }

    getStatusMessage() {
        return Contants.statusMSG[this.statusCode];
    }

    getDate() {
        let date: Date = new Date(this.startTimeStamp*1000);
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth()+1).padStart(2, '0');
        let yyyy = String(date.getFullYear());
        return dd+'.'+mm+'.'+yyyy;
    }

    getTime() {
        let date: Date = new Date(this.startTimeStamp*1000);
        let hh = String(date.getHours()).padStart(2,'0');
        let mm = String(date.getMinutes()).padStart(2, '0');
        return hh+':'+mm;
    }
}
