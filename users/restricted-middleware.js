module.exports = async function restricted(req, res, next) {
    try {
        if(req.session && req.session.user) {
            next();
        } else {
            res.status(404).json({
                message: 'Missing credentials'
            });
        }
    } catch(error) {
        res.status(500).json({
            message: 'You shall not pass! /n Server error while validating user'
        });
    }
}