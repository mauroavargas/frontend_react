const jwt = require('jsonwebtoken');
const KEY = 'Dark666';

module.exports = {
    validateToken: (req, res, next) => {
    const isToken = req.headers.authorization;
    if (isToken) {
        if (isToken.startsWith("pig ")) {
                const token = isToken.slice(4, isToken.length);
                jwt.verify(token, KEY, (err, decode) => {
                    if (err) {
                        res.status(403).send(err);
                    } else {
                        req.decode = decode;
                        next();
                    }
                })
            } else {
                res.status(403).send({message: 'Not is my token - pre'});
            }
        } else {
            res.status(403).send({message: 'You need a token to login'})
        }
    },
}