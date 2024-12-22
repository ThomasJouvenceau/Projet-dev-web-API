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
      allowNull: false,
    },
    MIN: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    FTS: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    RBD: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    TO: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
  }
);

Equipe.prototype.sendChangeRequest = function (adminId, changes) {

};

module.exports = Equipe;