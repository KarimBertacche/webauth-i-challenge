const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('./auth-model');
const checkBodyCredentials = require('../middlewares/checkBodyCredential-middleware');

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
            req.session.user = user;
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

router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(error => {
            if(error) {
                res.status(400).json({
                    message: 'Logged out negated, you shall never leave 😈🔥'
                });
            } else {
                res.status(200).json({
                    message: 'You have successfully logged out, good bye'
                });
            }
        });
    } else {
        res.end();
    }
});

module.exports = router;
