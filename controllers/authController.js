const authController = require("express").Router();
const { register, login } = require("../services/userService");
const { auth } = require("../utils/auth");

authController.get("/profile", auth(), (req, res) => {
  const { cars, email, username, _id } = req.user;
  res.status(200).json({ cars, email, username, _id });
});

authController.get("/register", (req, res) => {
  res.writeHead(200, "OK");
  res.write("<WElcome to register>");
  res.end();
});

authController.post("/register", async (req, res) => {
  try {
    if (
      req.body?.username == "" ||
      req.body?.password == "" ||
      req.body?.email == ""
    ) {
      throw new Error("All fields required!");
    }
    if (req.body?.rePassword !== req.body?.password) {
      throw new Error("Passwords must match!");
    }
    const token = await register(
      req.body.username,
      req.body.email,
      req.body.password
    );
    if (token) {
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ token });
    }
  } catch (error) {
    if (error.message === "Username is taken") {
      res.status(409).json({ error: error.message }); // Username is taken
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

authController.get("/login", (req, res) => {
  res.writeHead(200, "OK");
  res.write("<WElcome to LOGIN>");
  res.end();
});

authController.post("/login", async (req, res) => {
  try {
    if (req.body?.username == "" || req.body?.password == "") {
      throw new Error("All fields required!");
    }
    const token = await login(req.body.username, req.body.password);
    if (token) {
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ token });
    }
  } catch (error) {
    if (error.message === "Incorrect username or password") {
      res.status(401).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

authController.get("/logout", auth(), async (req, res) => {
  res.clearCookie("token").status(204).json({ message: "Logged Out" });
});

module.exports = authController;
