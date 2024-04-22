const bcrypt = require('bcrypt');
const User = require('../models/User');
const { createSession } = require('../utils/jwt');


async function getUsers() {
    const users = await User.find({});
    return users;
}

async function register(username, password) {
    const existing = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    try {

        if (existing) {
            throw new Error('Username is taken');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            hashedPassword
        });
        return createSession(user);
    } catch (error) {
        throw error
    }
}

async function login(username, password) {
    const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (!user) {
        throw new Error('Incorrect username or password');
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!hasMatch) {
        throw new Error('Incorrect username or password');
    }
    return createSession(user)
}


module.exports = {
    register,
    login,
    getUsers
}