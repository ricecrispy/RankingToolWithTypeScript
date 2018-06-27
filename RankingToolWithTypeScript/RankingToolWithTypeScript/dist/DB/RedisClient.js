"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
class RedisClient {
    constructor() {
        this.client = redis.createClient();
        this.client
            .on("error", (err) => {
            console.log(`Error connecting to Redis...${err}`);
        })
            .on("connect", () => {
            console.log(`Redis client connected!`);
        })
            .on("ready", () => {
            console.log(`Redis client is ready now.`);
        });
    }
    UpdateLeaderboardList(leaderboardList) {
        this.client.del(`LEADERBOARD`);
        this.client.lpush(`LEADERBOARD`, leaderboardList);
        this.client.save();
    }
    GetLeaderboardList() {
        return this.client.get(`LEADERBOARD`);
    }
}
exports.RedisClient = RedisClient;
//# sourceMappingURL=RedisClient.js.map