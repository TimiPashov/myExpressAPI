const jwt = require('jsonwebtoken');
const JWT_SECRET = 'TimiPashovSecret';

function createSession({ _id, username }) {
    const payload = {
        _id,
        username
    };
    return jwt.sign(payload, JWT_SECRET);
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

module.exports = {
    createSession,
    verifyToken
}