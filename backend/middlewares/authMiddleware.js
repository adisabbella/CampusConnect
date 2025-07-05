const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const routeProtector = (req, res, next) => {
    const userToken = req.cookies.token;
    if (!userToken) {
      res.status(401).json({ message: "Unauthorized. Please sign in." });
    }
    try {
      const decoded = jwt.verify(userToken, secret);
      req.user = decoded;
      next();
    }
    catch {
      res.status(403).json({ message: "Invalid or Expired token" })
    }
} 

module.exports = routeProtector;
