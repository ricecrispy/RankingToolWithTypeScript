"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Season_1 = require("./Season");
class Leaderboard {
    constructor(newLeaderboardName, eloKFactor, startingElo) {
        this.name = newLeaderboardName;
        this.seasonList = new Array();
        this.CreateNewSeason(eloKFactor, startingElo);
    }
    CreateNewSeason(eloKFactor, startingElo) {
        let newSeason = new Season_1.Season(eloKFactor, startingElo);
        this.seasonList.push(newSeason);
        this.currentSeason = newSeason;
    }
}
exports.Leaderboard = Leaderboard;
//# sourceMappingURL=Leaderboard.js.map