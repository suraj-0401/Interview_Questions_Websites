const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    console.log("No token provided");
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, '123', (err, user) => {
    if (err) {
      console.log("Invalid token:", err.message);
      return res.status(403).json({ message: "Invalid token." });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
