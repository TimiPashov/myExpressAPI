const authController = require("express").Router();
const { register, login } = require("../services/userService");

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
      res.status(400).json({ error: error.message }); // Other errors
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
      res.status(400).json({ error: error.message }); // Other errors
    }
  }
});

module.exports = authController;
