const { Router } = require("express");
const User = require("../models/user");
const Equipe = require("../models/equipe");  
const Admin = require("../models/admin"); 
const Arbitre = require("../models/arbitre");  
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = new Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Adresse e-mail ou mot de passe incorrect(e)." });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Adresse e-mail ou mot de passe incorrect(e)." });

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

module.exports = router;
