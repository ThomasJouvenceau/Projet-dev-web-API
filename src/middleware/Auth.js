const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (roles = []) => {
  return async (req, res, next) => {
    const headerValue = req.headers.authorization ?? req.headers.Authorization;
    if (!headerValue) {
      console.log("Authorization header missing");
      return res.sendStatus(401);
    }

    const [type, token] = headerValue.split(/\s+/);
    if (type !== "Bearer") {
      console.log("Invalid token type");
      return res.sendStatus(401);
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(payload.id);

      if (!user || !user.activated) {
        console.log("User not found or not activated");
        return res.sendStatus(401);
      }

      // Vérification du rôle si nécessaire
      if (roles.length > 0 && !roles.includes(user.role)) {
        console.log("User does not have the required role");
        return res.sendStatus(403); // Forbidden
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error during authentication", error);
      return res.sendStatus(401);
    }
  };
};