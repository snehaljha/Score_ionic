export class FixtureScore {

    current: number;
    display: number;
    period1: number;
    normalTime: number;

    constructor(response) {
        this.current = response['current'];
        this.display = response['current'];
        this.period1 = response['period1'];
        this.normalTime = response['normalTime'];
    }
    
}
