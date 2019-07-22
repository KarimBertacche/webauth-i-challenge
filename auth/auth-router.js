const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('./auth-model');

router.post('/register', async (req, res) => {
    try {

    } catch(error) {
        res.status(500).json({
            message: 'Server error while registering'
        });
    }
});

router.post('/login', async (req, res) => {
    try {

    } catch(error) {
        res.status(500).json({
            message: 'Server error while login user'
        });
    }
});

module.exports = router;
