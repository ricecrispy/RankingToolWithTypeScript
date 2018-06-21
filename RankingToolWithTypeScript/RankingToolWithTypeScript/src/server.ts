import * as express from "express";
import * as bodyParser from "body-parser";
import * as fs from "fs";
import { Season } from "./Models/Season";
import { Person } from "./Models/Person";
import { Leaderboard } from "./Models/Leaderboard";
import { EloCalculation } from "./Models/EloCalculation";

const defaultKFactor: number = 10;
const defaultStartingElo: number = 1000;

let leaderboardList: Leaderboard[] = new Array();

const staticResourcePath = `${__dirname}\\static\\`;

const port: number = parseInt(process.env.port) || 3000;
const server: any = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server
    .get("/", (req: any, res: any) => {
        res.send(`Hello world!`);
    })

    .post("/leaderboard/getleaderboard", (req: any, res: any) => {
        let leaderboardName: string = req.body.LeaderboardName;
        if (leaderboardName !== undefined) {
            let leaderboard: Leaderboard = leaderboardList.find(leaderboard => {
                return leaderboard.name === leaderboardName;
            });
            if (leaderboard !== undefined) {
                res.send(leaderboard);
            } else {
                res.status(400).send(`There is no leaderboard with the name: ${leaderboardName}!`);
            }
        } else {
            res.status(400).send(`Please provide a value for LeaderboardName!`);
        }
    })

    .post("/leaderboard/createleaderboard", (req: any, res: any) => {
        let newLeaderboardName: string = req.body.LeaderboardName;
        if (newLeaderboardName !== undefined) {

            let leaderboard: Leaderboard = leaderboardList.find(leaderboard => {
                return leaderboard.name === newLeaderboardName;
            });

            if (leaderboard === undefined) {
                let kFactor: number = req.body.KFactor === undefined ? defaultKFactor : parseInt(req.body.KFactor);
                let startingElo: number = req.body.StartingElo === undefined ? defaultStartingElo : parseInt(req.body.StartingElo);

                let newLeaderboard: Leaderboard = new Leaderboard(newLeaderboardName, kFactor, startingElo);
                leaderboardList.push(newLeaderboard);

                res.send(leaderboardList);
            } else {
                res.status(400).send(`A leaderboard with the name: ${newLeaderboardName} already exists!`);
            }
        } else {
            res.status(400).send("Please provide a value for LeaderboardName!");
        }
    })

    .post("/leaderboard/reportmatch", (req: any, res: any) => {
        let leaderboardName = req.body.LeaderboardName;
        let winnerId: string = req.body.winner;
        let loserId: string = req.body.loser;

        if (leaderboardName !== undefined) {
            let leaderboard: Leaderboard = leaderboardList.find(leaderboard => {
                return leaderboard.name === leaderboardName;
            });
            if (leaderboard !== undefined) {

                let currSeason = leaderboard.currentSeason;
                currSeason.ReportMatch(winnerId, loserId);

                res.send(leaderboard.currentSeason);
            } else {
                res.status(400).send(`There is no leaderboard with the name: ${leaderboardName}!`);
            }
        } else {
            res.status(400).send(`Please provide a value for LeaderboardName!`);
        }
    })

    .post("/leaderboard/getcurrentseasonrankedlist", (req: any, res: any) => {
        let leaderboardName: string = req.body.LeaderboardName;
        if (leaderboardName !== undefined) {
            let leaderboard: Leaderboard = leaderboardList.find(leaderboard => {
                return leaderboard.name === leaderboardName;
            });
            if (leaderboard !== undefined) {
                let currSeason: Season = leaderboard.currentSeason;
                let rankings = currSeason.GetRankingList(currSeason.allPlayerList);

                res.send(rankings);
            } else {
                res.status(400).send(`There is no leaderboard with the name: ${leaderboardName}!`);
            }
        } else {
            res.status(400).send(`Please provide a value for LeaderboardName!`);
        }
    })

    .listen(port, () => console.log(`Listening on port: ${port}...`));