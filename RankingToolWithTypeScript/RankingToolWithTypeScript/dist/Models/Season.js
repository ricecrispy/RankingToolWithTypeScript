"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Person_1 = require("./Person");
const EloCalculation_1 = require("./EloCalculation");
class Season {
    constructor(eloKFactor, startingElo) {
        let today = new Date();
        this.createdMonth = today.getUTCMonth() + 1;
        this.createdYear = today.getUTCFullYear();
        this.rankedPlayerList = new Array();
        this.allPlayerList = new Array();
        this.eloCalculation = new EloCalculation_1.EloCalculation(eloKFactor);
        this.startingElo = startingElo;
    }
    AddPersonToList(player, playerList) {
        playerList.push(player);
    }
    GetPersonInList(personId, playerList) {
        return playerList.find(person => {
            return person.userId === personId;
        });
    }
    ReportMatch(winnerId, loserId) {
        let winner = this.GetPersonInList(winnerId, this.allPlayerList);
        if (winner === undefined) {
            winner = new Person_1.Person(winnerId);
            winner.currentRanking = this.startingElo;
            this.AddPersonToList(winner, this.allPlayerList);
        }
        winner.totalWin++;
        let loser = this.GetPersonInList(loserId, this.allPlayerList);
        if (loser === undefined) {
            loser = new Person_1.Person(loserId);
            loser.currentRanking = this.startingElo;
            this.AddPersonToList(loser, this.allPlayerList);
        }
        loser.totalLoss++;
        this.eloCalculation.CalculateEloBetweenTwoPlayers(winner, loser);
    }
    GetRankingList(playerList) {
        let rankedList = playerList.filter(player => {
            return player.GetTotalGamesPlayed() >= 10;
        });
        rankedList.sort((p1, p2) => {
            return (p1.currentRanking - p2.currentRanking) * -1;
        });
        let resultList = rankedList.map(person => {
            let result = {
                UserID: person.userId,
                Ranking: person.currentRanking
            };
            return result;
        });
        return resultList;
    }
}
exports.Season = Season;
//# sourceMappingURL=Season.js.map