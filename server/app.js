const express = require('express');
const http = require('http');
const { initializeSocket } = require('./infra/socket');
const {join} = require("node:path");

const PORT = process.env.PORT || 3005;
const app = express();
const server = http.createServer(app);
initializeSocket(server);

// Serve static files from React build
app.use(express.static(join(__dirname, '../client/build')));

// Fallback naar index.html voor React Router
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../client/build/index.html'));
});

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
