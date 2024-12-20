module.exports = (req, res, next) => {
  // Si la méthode est POST ou PATCH, nous devons analyser le corps de la requête
  if (!["POST", "PATCH"].includes(req.method)) return next();

  let data = "";
  
  // Accumuler les morceaux de données envoyés dans la requête
  req.on("data", (chunk) => (data += chunk.toString()));
  
  req.on("end", () => {
    // Si le type de contenu est JSON, nous essayons de le parser
    if (req.headers["content-type"] === "application/json") {
      try {
        req.body = JSON.parse(data); // Convertir le corps en objet JSON
      } catch (e) {
        return res.status(400).json({ message: "Erreur lors de l'analyse du corps de la requête." });
      }
    } else {
      // Si ce n'est pas du JSON, renvoyer une erreur
      return res.status(400).json({ message: "Le corps de la requête doit être au format JSON." });
    }
    
    next(); // Passer au middleware suivant ou à la route
  });
};
