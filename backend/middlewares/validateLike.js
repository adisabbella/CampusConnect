const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const secret = process.env.JWT_SECRET;

const likeProtector = async (req, res, next) => {
  const userToken = req.cookies.token;
  if (!userToken) {
    return res.status(401).json({ message: "Unauthorized user cannot like the post." });
  }

  try {
    const decoded = jwt.verify(userToken, secret);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found." });
    req.user = user;
    next();
  } catch (err) {
     return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = likeProtector;
