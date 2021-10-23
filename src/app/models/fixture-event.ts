import { Player } from './player';
export class FixtureEvent {

    time: number;
    addedTime: number;
    isHome: boolean;
    //types:- period(FT), substitution, goal-regular, injuryTime, card-yellow, card-red, goal-penalty, inGamePenalty-missed, penaltyShootout-missed, penaltyShootout-scored, 
    type: string;
    msg: string;
    primaryPlayer: Player;
    secondaryPlayer: Player;
    icon: string;

    constructor(parsed) {
        this.time = parsed.time;
        this.addedTime = parsed.addedTime;
        this.isHome = parsed.isHome;
        this.type = parsed.incidentType + (parsed.incidentClass?('-'+parsed.incidentClass):'');
        this.msg = parsed.text;
        if(parsed.playerIn)
            this.primaryPlayer = new Player(parsed.playerIn);
        else if(parsed.player)
            this.primaryPlayer = new Player(parsed.player);
        if(parsed.playerOut)
            this.secondaryPlayer = new Player(parsed.playerOut);
        else if(parsed.assist1)
            this.secondaryPlayer = new Player(parsed.assist1);
        this.icon = this.getIcon();
    }

    private getIcon() {
        if(this.type == 'goal-regular')
            return 'assets/images/goal_icon.svg';
        if(['inGamePenalty-missed', 'penaltyShootout-missed'].includes(this.type))
            return 'assets/images/missed_icon.svg';
        if(['goal-penalty', 'penaltyShootout-scored'].includes(this.type))
            return 'assets/images/penalty_scored_icon.svg';
        if(this.type == 'card-red')
            return 'assets/images/red_card_icon.svg';
        if(this.type == 'card-yellowRed')
            return 'assets/images/second_yellow_card_icon.svg';
        if(this.type == 'substitution')
            return 'assets/images/substitution_icon.svg';
        if(this.type == 'card-yellow')
            return 'assets/images/yellow_card_icon.svg';
        if(this.type == 'goal-ownGoal')
            return 'assets/images/own_goal_icon.svg';
        return 'na';
    }
    
}
