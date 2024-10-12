const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

function auth(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    let decodedinfo;
    try {
        decodedinfo = jwt.verify(token, JWT_SECRET);
        req.id = decodedinfo.id;
    }
    catch (err) {
        return res.status(401).json({
            message: "Unauthorized or token expired",
            error: err
        });
    }
    next();
}

module.exports = {auth};