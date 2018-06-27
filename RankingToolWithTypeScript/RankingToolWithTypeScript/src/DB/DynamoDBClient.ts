import * as AWS from "aws-sdk";

export class DynamoDBClient {
    dynamoClient: any;
    docClient: any;

    constructor(awsRegion: string, awsEndpoint: string) {
        AWS.config.update({ region: awsRegion });

        this.dynamoClient = new AWS.DynamoDB();
        this.docClient = new AWS.DynamoDB.DocumentClient();
        this.docClient.endpoint = this.dynamoClient.endpoint = new AWS.Endpoint(awsEndpoint);
    }

    InsertData() {
        console.log(`DB testing!`);
    }
}