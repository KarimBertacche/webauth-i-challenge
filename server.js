const express = require('express');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');

server = express();

server.use(express.json());
server.use('/api', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.send('The server is up and running just fine!')
});

module.exports = server;