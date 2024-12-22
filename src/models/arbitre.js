const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const bcrypt = require("bcryptjs");

class Arbitre extends Model {}

Arbitre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: "arbitres",
  }
);

Arbitre.addHook("beforeCreate", async (arbitre) => {
  const salt = await bcrypt.genSalt(10);
  arbitre.password = await bcrypt.hash(arbitre.password, salt);
});

Arbitre.addHook("beforeUpdate", async (arbitre, { fields }) => {
  if (fields.includes("password")) {
    const salt = await bcrypt.genSalt(10);
    arbitre.password = await bcrypt.hash(arbitre.password, salt);
  }
});
module.exports = Arbitre;