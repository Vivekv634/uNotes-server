require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const userTokenID = req.query.id;
    if (!userTokenID) {
        res.json({ error: 'User Authentication failed' });
    } else {
        try {
            const token = jwt.verify(userTokenID, process.env.TOKEN_KEY);
            if (token) {
                req.userID = token.userID;
                next();
            }
        } catch (error) {
            res.json({ error: 'User Authentication failed' });
        }
    }
}

module.exports = { authenticate };