const router = require('express').Router();
const db = require('./users-model');
const restricted = require('../middlewares/restricted-middleware');

router.get('/users', [restricted], async (req, res) => {
    try {
        const users = await db.find();

        res.status(200).json(users);

    } catch(error) {
        res.status(500).json({
            message: 'Server error while retrieving users'
        });
    }
});

module.exports = router;