const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('./users-model');

router.get('/', restricted, async (req, res) => {
    try {
        const users = await db.find();

        res.status(200).json(users);

    } catch(error) {
        res.status(500).json({
            message: 'Server error while retrieving users'
        });
    }
});

async function restricted(req, res, next) {
    try {
        const { username, password } = req.headers;

        if(username && password) {
            const user = await db.findBy({ username });

            if(user && bcrypt.compareSync(password, user.password)) {
                next();
            } else {
                res.status(404).json({
                    message: 'Invalid Credentials'
                });
            }

        } else {
            res.status(404).json({
                message: 'Missing Credentials'
            });
        }

    } catch(error) {
        res.status(500).json({
            message: 'You shall not pass! /n Server error while validating user'
        });
    }
}

module.exports = router;