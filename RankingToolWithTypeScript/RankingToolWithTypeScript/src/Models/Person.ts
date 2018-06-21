export class Person {
    userId: string;
    totalWin: number;
    totalLoss: number;
    currentRanking: number;

    constructor(newId: string) {
        this.userId = newId;
        this.totalLoss = 0;
        this.totalWin = 0;
        this.currentRanking = 0;
    }

    GetTotalGamesPlayed(): number {
        return this.totalWin + this.totalLoss;
    }

    GetWinRate(): string {
        if (this.GetTotalGamesPlayed() === 0) {
            return "0";
        }
        return ((this.totalWin) / this.GetTotalGamesPlayed()).toFixed(2);
    }

    GetPersonStat(): any {
        let userStat = {
            userId: this.userId,
            wins: this.totalWin,
            losses: this.totalLoss,
            totalGamesPlayed: this.GetTotalGamesPlayed(),
            winrate: this.GetWinRate()
        }

        return userStat;
    }
}