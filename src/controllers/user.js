const User = require("../models/user");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const users = await User.findAll({
        where: req.query,
      });
      res.json(users);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const user = await User.findByPk(parseInt(req.params.id));
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const nbUpdated = await User.update(req.body, {
        where: {
          id: parseInt(req.params.id),
        },
        individualHooks: true,
      });

      if (nbUpdated[0] === 0) {
        return res.sendStatus(404);
      }

      const user = await User.findByPk(parseInt(req.params.id));
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const nbDeleted = await User.destroy({
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
      const user = await User.findByPk(parseInt(req.params.id));
      if (user) {
        res.json({ message: "Change request sent." });
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  },
};