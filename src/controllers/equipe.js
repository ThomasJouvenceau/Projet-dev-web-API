const Equipe = require("../models/equipe");

module.exports = {
  getAll: async (req, res) => {
    try {
      const equipes = await Equipe.findAll({
        where: req.query, 
      });
      res.status(200).json(equipes);
    } catch (error) {
      console.error("Erreur lors de la récupération des équipes :", error);
      res.status(500).json({ message: "Une erreur est survenue lors de la récupération des équipes." });
    }
  },

  create: async (req, res) => {
    try {
      const equipe = await Equipe.create(req.body);
      res.status(201).json(equipe);  
    } catch (error) {
      console.error("Erreur lors de la création de l'équipe :", error);
      res.status(400).json({ message: "Erreur lors de la création de l'équipe. Veuillez vérifier vos données." });
    }
  },

  getOne: async (req, res) => {
    try {
      const equipe = await Equipe.findByPk(parseInt(req.params.id)); 
      if (!equipe) {
        return res.status(404).json({ message: "Équipe non trouvée." });  
      }
      res.status(200).json(equipe);  
    } catch (error) {
      console.error("Erreur lors de la récupération de l'équipe :", error);
      res.status(500).json({ message: "Une erreur est survenue lors de la récupération de l'équipe." });
    }
  },

  update: async (req, res) => {
    try {
      const nbUpdated = await Equipe.update(req.body, {
        where: {
          id: parseInt(req.params.id),  
        },
        individualHooks: true,  
      });

      if (nbUpdated[0] === 0) {
        return res.status(404).json({ message: "Équipe non trouvée ou aucune modification effectuée." });  
      }

      const equipe = await Equipe.findByPk(parseInt(req.params.id));  
      res.status(200).json(equipe); 
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'équipe :", error);
      res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour de l'équipe." });
    }
  },

  delete: async (req, res) => {
    try {
      const nbDeleted = await Equipe.destroy({
        where: {
          id: parseInt(req.params.id),  
        },
      });

      if (nbDeleted === 0) {
        return res.status(404).json({ message: "Équipe non trouvée." });  
      }

      res.status(204).send();  
    } catch (error) {
      console.error("Erreur lors de la suppression de l'équipe :", error);
      res.status(500).json({ message: "Une erreur est survenue lors de la suppression de l'équipe." });
    }
  },

  sendChangeRequest: async (req, res) => {
    try {
      const equipe = await Equipe.findByPk(parseInt(req.params.id));  
      if (!equipe) {
        return res.status(404).json({ message: "Équipe non trouvée." });  
      }

      res.status(200).json({ message: "Demande de changement envoyée avec succès." });
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande de changement :", error);
      res.status(500).json({ message: "Une erreur est survenue lors de l'envoi de la demande de changement." });
    }
  },
};