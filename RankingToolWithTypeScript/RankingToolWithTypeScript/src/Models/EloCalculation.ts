import { Person } from "./Person";

export class EloCalculation {
    kFactor: number;

    constructor(kFactor: number) {
        this.ChangeKFactor(kFactor);
    }

    ChangeKFactor(kfactor: number): void {
        this.kFactor = kfactor;
    }

    CalculateEloBetweenTwoPlayers(winner: Person, loser: Person): void {
        let winnerExpectedQ: number = this.CalculateExpectedQ(winner.currentRanking);
        let loserExpectedQ: number = this.CalculateExpectedQ(loser.currentRanking);

        let winnerExpectedScore: number = winnerExpectedQ / (winnerExpectedQ + loserExpectedQ);
        let loserExpectedScore: number = loserExpectedQ / (winnerExpectedQ + loserExpectedQ);

        let winnerNewRating: number = winner.currentRanking + this.kFactor * (1 - winnerExpectedScore);
        let loserNewRating: number = loser.currentRanking + this.kFactor * (0 - loserExpectedScore);

        if (winner.GetTotalGamesPlayed() >= 10) {
            winner.currentRanking = winnerNewRating;
        }

        if (loser.GetTotalGamesPlayed() >= 10) {
            loser.currentRanking = loserNewRating;
        }
    }

    CalculateExpectedQ(currentRating: number): number {
        return Math.pow(10, (currentRating / 400));
    }





}