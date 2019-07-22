const express = require('express');

server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('The server is up and running just fine!')
});

module.exports = server;