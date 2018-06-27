"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const port = process.env.PORT || 3000;
server_1.Server.listen(port, () => console.log(`Listening on port: ${port}...`));
//# sourceMappingURL=server.Start.js.map