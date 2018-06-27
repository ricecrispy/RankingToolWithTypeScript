"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const SwaggerUi = require("swagger-ui-express");
const Leaderboard_1 = require("./Models/Leaderboard");
const DynamoDBClient_1 = require("./DB/DynamoDBClient");
const staticResourcePath = `${__dirname}/static/`;
let swaggerDocument = require(`${staticResourcePath}swagger.json`);
const defaultKFactor = 10;
const defaultStartingElo = 1000;
let dynamoClient = new DynamoDBClient_1.DynamoDBClient("us-east-1", "http://localhost:8000");
dynamoClient.InsertData();
let leaderboardList = new Array();
const server = express();
exports.Server = server;
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server
    .get("/", (req, res) => {
    res.send(`Hello world!`);
})
    .post("/leaderboard/getleaderboard", (req, res) => {
    let leaderboardName = req.body.LeaderboardName;
    if (leaderboardName !== undefined) {
        let leaderboard = leaderboardList.find(leaderboard => {
            return leaderboard.name === leaderboardName;
        });
        if (leaderboard !== undefined) {
            res.send(leaderboard);
        }
        else {
            res.status(400).send(`There is no leaderboard with the name: ${leaderboardName}!`);
        }
    }
    else {
        res.status(400).send(`Please provide a value for LeaderboardName!`);
    }
})
    .post("/leaderboard/createleaderboard", (req, res) => {
    let newLeaderboardName = req.body.LeaderboardName;
    if (newLeaderboardName !== undefined) {
        let leaderboard = leaderboardList.find(leaderboard => {
            return leaderboard.name === newLeaderboardName;
        });
        if (leaderboard === undefined) {
            let kFactor = req.body.KFactor === undefined ? defaultKFactor : parseInt(req.body.KFactor);
            let startingElo = req.body.StartingElo === undefined ? defaultStartingElo : parseInt(req.body.StartingElo);
            let newLeaderboard = new Leaderboard_1.Leaderboard(newLeaderboardName, kFactor, startingElo);
            leaderboardList.push(newLeaderboard);
            res.send(leaderboardList);
        }
        else {
            res.status(400).send(`A leaderboard with the name: ${newLeaderboardName} already exists!`);
        }
    }
    else {
        res.status(400).send("Please provide a value for LeaderboardName!");
    }
})
    .post("/leaderboard/reportmatch", (req, res) => {
    let leaderboardName = req.body.LeaderboardName;
    let winnerId = req.body.winner;
    let loserId = req.body.loser;
    if (leaderboardName !== undefined) {
        let leaderboard = leaderboardList.find(leaderboard => {
            return leaderboard.name === leaderboardName;
        });
        if (leaderboard !== undefined) {
            let currSeason = leaderboard.currentSeason;
            currSeason.ReportMatch(winnerId, loserId);
            res.send(leaderboard.currentSeason);
        }
        else {
            res.status(400).send(`There is no leaderboard with the name: ${leaderboardName}!`);
        }
    }
    else {
        res.status(400).send(`Please provide a value for LeaderboardName!`);
    }
})
    .post("/leaderboard/getcurrentseasonrankedlist", (req, res) => {
    let leaderboardName = req.body.LeaderboardName;
    if (leaderboardName !== undefined) {
        let leaderboard = leaderboardList.find(leaderboard => {
            return leaderboard.name === leaderboardName;
        });
        if (leaderboard !== undefined) {
            let currSeason = leaderboard.currentSeason;
            let rankings = currSeason.GetRankingList(currSeason.allPlayerList);
            res.send(rankings);
        }
        else {
            res.status(400).send(`There is no leaderboard with the name: ${leaderboardName}!`);
        }
    }
    else {
        res.status(400).send(`Please provide a value for LeaderboardName!`);
    }
})
    .use('/api', SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));
//# sourceMappingURL=server.js.map