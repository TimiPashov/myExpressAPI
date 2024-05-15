const bcrypt = require("bcrypt");
const User = require("../models/User");
const { createSession } = require("../utils/jwt");

async function getUsers() {
  const users = await User.find({});
  return users;
}

async function register(username, email, password) {
  const existingUser = await User.findOne({ username }).collation({
    locale: "en",
    strength: 2,
  });
  const existingEmail = await User.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });
  try {
    if (existingUser) {
      throw new Error("Username is taken");
    }
    if (existingEmail) {
      throw new Error("Email is taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      hashedPassword,
    });
    return createSession(user);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function login(username, password) {
  const user = await User.findOne({ username }).collation({
    locale: "en",
    strength: 2,
  });
  try {
    if (!user) {
      throw new Error("Incorrect username or password");
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!hasMatch) {
      throw new Error("Incorrect username or password");
    }
    return createSession(user);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  register,
  login,
  getUsers,
};
