const express = require('express');
const http = require('http');
const cors = require('cors');
const { initializeSocket } = require('./infra/socket');


const PORT = process.env.PORT || 3005;
const app = express();
app.use(cors());
const server = http.createServer(app);
initializeSocket(server);



server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
