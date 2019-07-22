const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('./auth-model');

router.post('/register', checkBodyCredentials, async (req, res) => {
    try {
        let { username, password } = req.body;

        password = bcrypt.hashSync(password, 12);

        const user = await db.add({ username, password });

        res.status(201).json(user);

    } catch(error) {
        res.status(500).json({
            message: 'Server error while registering'
        });
    }
});

router.post('/login', checkBodyCredentials, async (req, res) => {
    try {
        let { username, password } = req.body;
        
        const user = await db.findBy({ username });

        if(user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({
                message: `Welcome ${user.username}!`
            });
        } else {
            res.status(400).json({
                message: 'Invalid Credentials'
            });
        }

    } catch(error) {
        res.status(500).json({
            message: 'You shall not pass!!🧙‍♂️ /n Server error while login user'
        });
    }
});

async function checkBodyCredentials(req, res, next) {
    try {
        let {username, password} = req.body;

        if(username && password) {
            next();
        } else {
            res.status(404).json({
                message: 'Missing Credentials'
            });
        }

    } catch(error) {
        res.status(500).json({
            message: 'You shall not pass!!🧙‍♂️'
        });
    }
}

module.exports = router;
