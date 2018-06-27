"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
class DynamoDBClient {
    constructor(awsRegion, awsEndpoint) {
        AWS.config.update({ region: awsRegion });
        this.dynamoClient = new AWS.DynamoDB();
        this.docClient = new AWS.DynamoDB.DocumentClient();
        this.docClient.endpoint = this.dynamoClient.endpoint = new AWS.Endpoint(awsEndpoint);
    }
    InsertData() {
        console.log(`DB testing!`);
    }
}
exports.DynamoDBClient = DynamoDBClient;
//# sourceMappingURL=DynamoDBClient.js.map