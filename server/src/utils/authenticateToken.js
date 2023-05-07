const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../src/config");

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header("authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.log({ token, err });
      return res.status(403).json({ error: "Forbidden" });
    }

    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
