const express = require('express');
const http = require('http');
const { initializeSocket } = require('./infra/socket');
const {join} = require("node:path");

const PORT = process.env.PORT || 3005;
const app = express();
const server = http.createServer(app);
initializeSocket(server);



server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
