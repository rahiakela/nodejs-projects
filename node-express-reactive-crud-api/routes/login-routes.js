let router = require('express').Router();
let jwt = require('jsonwebtoken');
let models = require('../models/models');

let SECRET = 'this is a secret phrase';

router.post('/tokens', (req,res, next) => {

    models.users.findOne({
        username: req.body.username,
        password: req.body.password
    }).then((user) => {
        if(!user) {
            return next({error: true, msg: 'User not valid'});
        }

        let token = jwt.sign({
            name: user.first_name,
            birth_date: user.birth_date
        }, SECRET, {'expiresIn': '1 day'});

        res.json({token: token});
    }).catch(next);

});

let check_token = (req, res, next) => {

    let token = req.query.token || req.headers.token;

    // we make sure the url required for requesting a token is not protected
    if (req.url.indexOf('/tokens') !== -1) {
        return next();
    }

    if (!token) {
        return next('No token provided');
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return next(err);
        }

        next();
    });
}

module.exports = {
    router: router,
    check_token: check_token
};