const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Equipe = require("../models/equipe");
const Arbitre = require("../models/arbitre");
const Admin = require("../models/admin");

module.exports = async (req, res, next) => {
  const headerValue = req.headers.authorization ?? req.headers.Authorization;

  if (!headerValue) return res.sendStatus(401);
  const [type, token] = headerValue.split(/\s+/);

  if (type !== "Bearer") return res.sendStatus(401);
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET ?? "Tres$ecureKey321$$V3RY$$trong"
    );

    if (payload.role === "user") {
      req.user = await User.findByPk(payload.id);
      if (!req.user) return res.sendStatus(401);
      if (!req.user.activated) return res.sendStatus(403);
    } else if (payload.role === "admin") {
      req.user = await Admin.findByPk(payload.id);
      if (!req.user) return res.sendStatus(401);
    } else if (payload.role === "arbitre") {
      req.user = await Arbitre.findByPk(payload.id);
      if (!req.user || !req.user.approvedByAdmin) return res.sendStatus(403);
    } else if (payload.role === "equipe") {
      req.user = await Equipe.findByPk(payload.id);
      if (!req.user || !req.user.approvedByAdmin) return res.sendStatus(403);
    } else {
      return res.sendStatus(403);
    }

    req.user.role = payload.role;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};
