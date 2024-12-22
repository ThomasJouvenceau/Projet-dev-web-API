const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
class Match extends Model {}

Match.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    equipe1_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'equipes',
        key: 'id',
      },
      allowNull: false,
    },
    equipe2_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'equipes',
        key: 'id',
      },
      allowNull: false,
    },
    arbitre_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'arbitres',
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: "matches",
  }
);

module.exports = Match;