const express = require('express');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const session = require('express-session');

server = express();

server.use(express.json());
server.use(session({
    name: 'Monkey',
    secret: 'Keep it secret, keep it long, keep it safe!!',
    cookie: {
        maxAge: 1000 * 60 * 60, 
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: true,
}));

server.use('/api', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.send('The server is up and running just fine!')
});

module.exports = server;