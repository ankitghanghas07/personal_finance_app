function authenticateJWT(req, res, next) {
  const authHeader = req.header("Authorization");

  if(!authHeader){
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({error : "forbidden"});
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.error("JWT verification error: " + err.message);
      return res.status(403).json({ error: "Forbidden" });
    }

    req.user_id = user.id;
    next();
  });
}

module.exports = authenticateJWT;
