const bcrypt = require('bcrypt');
const User = require('../models/User');


async function register(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        hashedPassword
    });
}

module.exports = {
    register
}