import { Person } from "./Person";
import { EloCalculation } from "./EloCalculation";

export class Season {
    createdMonth: number;
    createdYear: number;
    rankedPlayerList: Person[];
    allPlayerList: Person[];
    eloCalculation: EloCalculation;
    startingElo: number;

    constructor(eloKFactor: number, startingElo: number) {
        let today: Date = new Date();
        this.createdMonth = today.getUTCMonth() + 1;
        this.createdYear = today.getUTCFullYear();

        this.rankedPlayerList = new Array();
        this.allPlayerList = new Array();

        this.eloCalculation = new EloCalculation(eloKFactor);
        this.startingElo = startingElo;
    }

    AddPersonToList(player: Person, playerList: Person[]): void {
        playerList.push(player);
    }

    GetPersonInList(personId: string, playerList: Person[]): Person {
        return playerList.find(person => {
            return person.userId === personId;
        });
    }

    ReportMatch(winnerId: string, loserId: string): void {
        let winner: Person = this.GetPersonInList(winnerId, this.allPlayerList);
        if (winner === undefined) {
            winner = new Person(winnerId);
            winner.currentRanking = this.startingElo;
            this.AddPersonToList(winner, this.allPlayerList);
        }
        winner.totalWin++;


        let loser: Person = this.GetPersonInList(loserId, this.allPlayerList);
        if (loser === undefined) {
            loser = new Person(loserId);
            loser.currentRanking = this.startingElo;
            this.AddPersonToList(loser, this.allPlayerList);
        }
        loser.totalLoss++;

        this.eloCalculation.CalculateEloBetweenTwoPlayers(winner, loser);
    }

    GetRankingList(playerList: Person[]) {

        let rankedList: Person[] = playerList.filter(player => {
            return player.GetTotalGamesPlayed() >= 10;
        });

        rankedList.sort((p1: Person, p2: Person) => {
            return (p1.currentRanking - p2.currentRanking) * -1;
        });

        let resultList = rankedList.map(person => {
            let result = {
                UserID: person.userId,
                Ranking: person.currentRanking
            }
            return result;
        });

        return resultList;
    }
}