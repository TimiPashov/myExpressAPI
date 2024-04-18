const bcrypt = require('bcrypt');
const User = require('../models/User');
const { createSession } = require('../utils/jwt');


async function getUsers() {
    const users = await User.find({});
    return users;
}

async function register(username, password) {
    const existing = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existing) {
        throw new Error('Username is taken');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        hashedPassword
    });
    return createSession(user);
}

module.exports = {
    register,
    getUsers
}