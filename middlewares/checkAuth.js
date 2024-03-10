const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateJWT(req, res, next) {
  console.log(req.headers);
  const authHeader = req.headers["authorization"];

  if(!authHeader){
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({error : "forbidden"});
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT verification error: " + err.message);
      return res.status(403).json({ error: "Forbidden" });
    }

    req.user_id = user.id;
    next();
  });
}

module.exports = authenticateJWT;
