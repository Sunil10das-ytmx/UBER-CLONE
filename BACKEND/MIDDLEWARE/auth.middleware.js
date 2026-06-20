const userModel = require('../MODELS/user.model.js');
const jwt = require('jsonwebtoken');
const blacklistModel = require('../MODELS/blacklist.model.js');
const captainModel = require('../MODELS/captain.model.js');

module.exports.authUser = async (req, res, next) => {
    let token;

    //! cookie-parser: req.cookies.token
    if (req.cookies && req.cookies.token) token = req.cookies.token;

    //! Authorization header: "Bearer <token>"
    if (!token && req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(' ');
        if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
            token = parts[1];
        } else {
            token = parts[0];
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blacklistModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) return res.status(401).json({ message: 'Unauthorized' });

        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports.authCaptain = async(req,res,next)=>{
    let token;

    //! cookie-parser: req.cookies.token
    if (req.cookies && req.cookies.token) token = req.cookies.token;

    //! Authorization header: "Bearer <token>"
    if (!token && req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(' ');
        if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
            token = parts[1];
        } else {
            token = parts[0];
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blacklistModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const captain = await captainModel.findById(decoded._id);
        if (!captain) return res.status(401).json({ message: 'Unauthorized' });

        req.captain = captain;
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}