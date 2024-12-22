const Equipe = require("../models/equipe"); 

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const equipes = await Equipe.findAll({
        where: req.query,
      });
      res.json(equipes);
    } catch (error) {
      next(error); 
    }
  },

  create: async (req, res, next) => {
    try {
      const equipe = await Equipe.create(req.body);
      res.status(201).json(equipe); 
    } catch (error) {
      next(error); 
    }
  },

  getOne: async (req, res, next) => {
    try {
      const equipe = await Equipe.findByPk(parseInt(req.params.id)); // Trouver l'équipe par son ID
      if (equipe) {
        res.json(equipe); // Si l'équipe existe, la renvoyer en réponse
      } else {
        res.sendStatus(404); // Si l'équipe n'est pas trouvée, renvoyer un code 404
      }
    } catch (error) {
      next(error); // Passer l'erreur à un middleware de gestion des erreurs
    }
  },

  // Mettre à jour une équipe spécifique
  update: async (req, res, next) => {
    try {
      const nbUpdated = await Equipe.update(req.body, {
        where: {
          id: parseInt(req.params.id), // Mettre à jour l'équipe avec cet ID
        },
        individualHooks: true, // Assurez-vous que tous les hooks sont appelés
      });

      if (nbUpdated[0] === 0) {
        return res.sendStatus(404); // Si aucune équipe n'a été mise à jour, renvoyer un code 404
      }

      const equipe = await Equipe.findByPk(parseInt(req.params.id)); 
      res.json(equipe); 
    } catch (error) {
      next(error); 
    }
  },

  delete: async (req, res, next) => {
    try {
      const nbDeleted = await Equipe.destroy({
        where: {
          id: parseInt(req.params.id), 
        },
      });
      res.sendStatus(nbDeleted ? 204 : 404);
    } catch (error) {
      next(error); 
    }
  },

  sendChangeRequest: async (req, res, next) => {
    try {
      const equipe = await Equipe.findByPk(parseInt(req.params.id)); 
      if (equipe) {
        res.json({ message: "Demande de changement envoyée." });
      } else {
        res.sendStatus(404); 
      }
    } catch (error) {
      next(error); 
    }
  },
};
