const { Router } = require("express");
const User = require("../models/user");
const Equipe = require("../models/equipe");  
const Admin = require("../models/admin"); 
const Arbitre = require("../models/arbitre");  
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = new Router();

router.post("/login/user", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Adresse e-mail ou mot de passe incorrect(e)." });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Adresse e-mail ou mot de passe incorrect(e)." });

    if (!user.activated) return res.status(403).json({ message: "Compte non activé." });

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET || "Tres$ecureKey321$$V3RY$$trong",
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: "Connexion réussie.", token });

  } catch (error) {
    console.error("Erreur lors de la connexion", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

router.post("/login/admin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(401).json({ message: "Adresse e-mail ou mot de passe incorrect(e)." });

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Adresse e-mail ou mot de passe incorrect(e)." });

    const token = jwt.sign(
      {
        id: admin.id,
        name: admin.name,
        role: 'admin',
      },
      process.env.JWT_SECRET || "Tres$ecureKey321$$V3RY$$trong",
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: "Connexion réussie.", token });

  } catch (error) {
    console.error("Erreur lors de la connexion", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

router.post("/login/arbitre", async (req, res) => {
  const { email, password } = req.body;

  try {
    const arbitre = await Arbitre.findOne({ where: { email } });
    if (!arbitre) return res.status(401).json({ message: "Adresse e-mail ou mot de passe incorrect(e)." });

    const isPasswordValid = await bcrypt.compare(password, arbitre.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Adresse e-mail ou mot de passe incorrect(e)." });

    const token = jwt.sign(
      {
        id: arbitre.id,
        name: arbitre.name,
        role: 'arbitre',
      },
      process.env.JWT_SECRET || "Tres$ecureKey321$$V3RY$$trong",
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: "Connexion réussie.", token });

  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

router.post("/login/equipe", async (req, res) => {
  const { email, password } = req.body;

  try {
    const equipe = await Equipe.findOne({ where: { email } });
    if (!equipe) return res.status(401).json({ message: "Adresse e-mail ou mot de passe incorrect(e)." });

    const isPasswordValid = await bcrypt.compare(password, equipe.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Adresse e-mail ou mot de passe incorrect(e)." });

    const token = jwt.sign(
      {
        id: equipe.id,
        name: equipe.name,
        role: 'equipe',
      },
      process.env.JWT_SECRET || "MTres$ecureKey321$$V3RY$$trong",
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: "Connexion réussie.", token });

  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

module.exports = router;
