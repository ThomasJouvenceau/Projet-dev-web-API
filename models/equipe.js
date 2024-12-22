const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Equipe extends Model {}

Equipe.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PTS: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    MIN: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    FTS: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    RBD: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    TO: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize: connection,
  }
);

Equipe.prototype.sendChangeRequest = function (adminId, changes) {

};

module.exports = Equipe;