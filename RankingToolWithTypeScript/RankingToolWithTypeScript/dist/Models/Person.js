"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    constructor(newId) {
        this.userId = newId;
        this.totalLoss = 0;
        this.totalWin = 0;
        this.currentRanking = 0;
    }
    GetTotalGamesPlayed() {
        return this.totalWin + this.totalLoss;
    }
    GetWinRate() {
        if (this.GetTotalGamesPlayed() === 0) {
            return "0";
        }
        return ((this.totalWin) / this.GetTotalGamesPlayed()).toFixed(2);
    }
    GetPersonStat() {
        let userStat = {
            userId: this.userId,
            wins: this.totalWin,
            losses: this.totalLoss,
            totalGamesPlayed: this.GetTotalGamesPlayed(),
            winrate: this.GetWinRate()
        };
        return userStat;
    }
}
exports.Person = Person;
//# sourceMappingURL=Person.js.map