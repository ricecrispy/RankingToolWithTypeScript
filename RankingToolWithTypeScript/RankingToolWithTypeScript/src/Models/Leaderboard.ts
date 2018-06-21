import { Season } from "./Season";
import { Person } from "./Person";

export class Leaderboard {
    name: string;
    seasonList: Season[];
    currentSeason: Season;

    constructor(newLeaderboardName: string, eloKFactor: number, startingElo: number) {
        this.name = newLeaderboardName;
        this.seasonList = new Array();
        this.CreateNewSeason(eloKFactor, startingElo);
    }

    CreateNewSeason(eloKFactor: number, startingElo: number) {
        let newSeason: Season = new Season(eloKFactor, startingElo);
        this.seasonList.push(newSeason);
        this.currentSeason = newSeason;
    }
}