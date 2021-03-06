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
    offset: number;
    periodStartTimeStamp: number;
    maxTime: number;

    constructor(response, league: League) {
        this.league = league;
        this.statusCode = response['status']['code'];
        this.homeTeam = new Team(response['homeTeam']);
        this.awayTeam = new Team(response['awayTeam']);
        this.id = response['id'];
        this.startTimeStamp = response['startTimestamp'];
        if(response['time']) {
            this.offset = response['time']['initial'];
            this.offset /= 60;
            this.periodStartTimeStamp = response['time']['currentPeriodStartTimestamp'];
            this.maxTime = response['time']['max'];
            this.maxTime /= 60;
        }
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
        if((this.statusCode == 6 || this.statusCode == 7) && this.periodStartTimeStamp && this.offset != null)
            return this.getInFixtureTime();
        if(Contants.statusMSG[this.statusCode])
            return Contants.statusMSG[this.statusCode];
        return '#' + this.statusCode.toString();
    }

    getDate() {
        let date: Date = new Date(this.startTimeStamp*1000);
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth()+1).padStart(2, '0');
        let yyyy = String(date.getFullYear());
        return dd+'/'+mm+'/'+yyyy;
    }

    getTime() {
        let date: Date = new Date(this.startTimeStamp*1000);
        let hh = String(date.getHours()).padStart(2,'0');
        let mm = String(date.getMinutes()).padStart(2, '0');
        return hh+':'+mm;
    }

    getInFixtureTime() {
        let currentTimeStamp: number = Math.floor(Date.now()/1000);
        let diff = (currentTimeStamp-this.periodStartTimeStamp)/60;
        let res = Number((this.offset + diff).toFixed());
        if(res > this.maxTime) {
            return this.maxTime.toString() + '+' + (res-this.maxTime).toString() + '\'';
        }
        return res.toString() + '\'';
    }
}
