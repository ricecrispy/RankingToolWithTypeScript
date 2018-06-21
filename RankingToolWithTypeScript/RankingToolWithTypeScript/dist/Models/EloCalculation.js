"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EloCalculation {
    constructor(kFactor) {
        this.ChangeKFactor(kFactor);
    }
    ChangeKFactor(kfactor) {
        this.kFactor = kfactor;
    }
    CalculateEloBetweenTwoPlayers(winner, loser) {
        let winnerExpectedQ = this.CalculateExpectedQ(winner.currentRanking);
        let loserExpectedQ = this.CalculateExpectedQ(loser.currentRanking);
        let winnerExpectedScore = winnerExpectedQ / (winnerExpectedQ + loserExpectedQ);
        let loserExpectedScore = loserExpectedQ / (winnerExpectedQ + loserExpectedQ);
        let winnerNewRating = winner.currentRanking + this.kFactor * (1 - winnerExpectedScore);
        let loserNewRating = loser.currentRanking + this.kFactor * (0 - loserExpectedScore);
        if (winner.GetTotalGamesPlayed() >= 10) {
            winner.currentRanking = winnerNewRating;
        }
        if (loser.GetTotalGamesPlayed() >= 10) {
            loser.currentRanking = loserNewRating;
        }
    }
    CalculateExpectedQ(currentRating) {
        return Math.pow(10, (currentRating / 400));
    }
}
exports.EloCalculation = EloCalculation;
//# sourceMappingURL=EloCalculation.js.map