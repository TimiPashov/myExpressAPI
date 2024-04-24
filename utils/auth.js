const jwt = require("./jwt");
const tokenName = "token";

const User = require("../models/User");

function auth(redirectUnauthenticated = true) {
  return function (req, res, next) {
    const token = req.cookies[tokenName] || "";
   
    jwt
      .verifyToken(token)
      .then((tokenData) => {
        User.findById(tokenData._id).then((user) => {
          req.user = user;
          req.isLogged = true;
          next();
        });
      })
      .catch((err) => {
        if (!redirectUnauthenticated) {
          next();
          return;
        }
        if (
          [
            "token expired",
            "blacklisted token",
            "jwt must be provided",
          ].includes(err.message)
        ) {
          console.error(err);
          res.status(401).send({ message: "Invalid token!" });
          return;
        }
        next(err);
      });
  };
}

module.exports = {
  auth,
};
