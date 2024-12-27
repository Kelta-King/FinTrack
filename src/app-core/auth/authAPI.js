const crypto = require('crypto');
const NETWORK_CONFIG = require('../common/NETWORK_CONFIG');
const LOGGER = require('../../Logger/logger');
const AUTH_DATA = require("./authKeys");

const GLOBAL_USER_ID = 87654321;
const userStore = {}; // Format: { userid: { hashedKey, token } }

function hashKey(key) {
    const hash = crypto.createHmac('sha256', AUTH_DATA.SECRET_KEY)
        .update(key)
        .digest('hex');
    return hash;
}

function generateToken(hashedKey) {
    const token = crypto.createHmac('sha256', AUTH_DATA.SECRET_KEY)
        .update(hashedKey)
        .digest('hex');
    return token;
}

function signinUser(key) {
    const hashedKey = hashKey(key);
    const token = generateToken(hashedKey);
    userStore[GLOBAL_USER_ID] = { hashedKey, token };
    return token;
}

function logoutUser(userid) {
    delete userStore[userid]; 
}

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        LOGGER.error(`No token provided by User`); 
        return res.status(NETWORK_CONFIG.STATUS.UNAUTHORIZED).send({
            message: 'Unauthorized',
        });
    }

    const user = userStore[GLOBAL_USER_ID];

    if (!user) {
        LOGGER.error(`Invalid token provided`); 
        return res.status(NETWORK_CONFIG.STATUS.UNAUTHORIZED).send({
            message: 'Unauthorized',
        });
    }

    const expectedToken = generateToken(user.hashedKey);
    if (token === expectedToken) {
        LOGGER.debug(`Middleware auth passed`);
        next(); 
    } else {
        LOGGER.error(`Invalid token provided`); 
        return res.status(NETWORK_CONFIG.STATUS.UNAUTHORIZED).send({
            message: 'Invalid token',
        });
    }
}

function updateSignInKey(userid, oldKey, newKey) {
    const user = userStore[userid];

    if (!user) {
        return 'User not found';
    }

    const oldHashedKey = hashKey(oldKey);
    if (oldHashedKey === user.hashedKey) {
        user.hashedKey = hashKey(newKey); 
        user.token = generateToken(userid, user.hashedKey); 
        return user.token;
    } else {
        return 'Old key is incorrect';
    }
}

module.exports = {
    signinUser,
    logoutUser,
    verifyToken,
    updateSignInKey
}