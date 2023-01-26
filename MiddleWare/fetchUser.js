const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const fetchUser = (req, res, next) => {
    // Get the user from the jwt token and add id to request.
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).send({ error: "Please authenticate usig a walid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch (err) {
        return res.status(401).send({ error: "Please authenticate usig a walid token" });
    }
}
module.exports = fetchUser;