require('dotenv').config();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


async function signup(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const existingUser = await User.findUser(email);
  if(existingUser.length){
    return res.json({message : 'user with this email already exists'});
  }

  const user = new User(email, password);

  try {
    await user.save();
    res.status(200).json({message : 'user registration successfull'});
  } catch (error) {
    res.status(500).json({ error: error });
  }
  
}

async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findUser(email);
  if (!user) {
    return res.json({ message: "user not found" });
  }

  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched) {
    return res.status(401).json({ message: "password did not match." });
  }

  const userData = {
    id: user.user_id,
  };

  const token = jwt.sign(
    userData,
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
    function (err, token) {
      if (err) {
        return res.status(500).json({ message: "try again" });
      }
      return res.status(200).json(token);
    }
  );
}

module.exports = {
  signup: signup,
  login: login,
};
