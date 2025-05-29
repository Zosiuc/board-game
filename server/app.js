const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { initializeSocket } = require('./infra/socket');

const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
initializeSocket(server);


server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
