const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from the header

  if (!token) return res.sendStatus(401); // Unauthorized if no token

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {console.log('err:', err); return res.sendStatus(403);} // Forbidden if token is invalid
    req.user = user; // Attach user info to req object
    next();
  });
};

module.exports = { verifyToken }