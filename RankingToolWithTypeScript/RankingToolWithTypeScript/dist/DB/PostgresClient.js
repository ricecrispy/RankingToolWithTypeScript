"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class PostgresClient {
    constructor() {
        this.client = new pg_1.Client({
            host: "postgres://vbakhavhirbluj:89201621485f3f3806ba57f7bf55cff4e4c3f0c2c0bca5e290b2bbc26119acb6@ec2-107-20-188-239.compute-1.amazonaws.com",
            port: 5432
        });
        this.client.connect((err) => {
            if (err) {
                console.error(`Postgres client connection error. ${err}`);
            }
            else {
                console.log(`Postgres client connected.`);
            }
        });
    }
}
exports.PostgresClient = PostgresClient;
//# sourceMappingURL=PostgresClient.js.map