module.exports = (req, res, next) => {
  if (!["POST", "PATCH"].includes(req.method)) return next();

  let data = "";
  
  req.on("data", (chunk) => (data += chunk.toString()));
  
  req.on("end", () => {
    if (req.headers["content-type"] === "application/json") {
      try {
        req.body = JSON.parse(data); 
      } catch (e) {
        return res.status(400).json({ message: "Erreur lors de l'analyse du corps de la requête." });
      }
    } else {
      return res.status(400).json({ message: "Le corps de la requête doit être au format JSON." });
    }
    
    next(); 
  });
};
