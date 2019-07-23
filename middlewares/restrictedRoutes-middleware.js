module.exports = (req, res, next) => {
    const path = '/api/restricted';
    if(req.baseUrl.startsWith(path) && req.session.user) {
        console.log('Is not working sorry...')
        next();
    } else {
        res.status(404).json({
            message: 'Restricted access, you shall not pass stranger!!'
        });
    }   
}