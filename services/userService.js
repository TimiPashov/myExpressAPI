const bcrypt = require('bcrypt');
const User = require('../models/User');


async function getUsers() {
    const users = await User.find({});
    console.log(JSON.stringify(users))
    return users;
}

async function register(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        hashedPassword
    });
}

module.exports = {
    register,
    getUsers
}