module.exports = async (req, res, next) => {
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