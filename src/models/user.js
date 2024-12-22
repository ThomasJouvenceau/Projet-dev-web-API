const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const bcrypt = require("bcryptjs");

class User extends Model {}

User.init(
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
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.ENUM(["ROLE_USER", "ROLE_ADMIN"]),
      defaultValue: "ROLE_USER",
      allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {},
      },
    birthday: {
      type: DataTypes.DATEONLY, 
      allowNull: true,    
    },
  },
  {
    sequelize: connection, 
    tableName: "user",    
  }
);
User.addHook("beforeCreate", async (user) => {
  user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
});

User.addHook("beforeUpdate", async (user, { fields }) => {
  if (fields.includes("password"))
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
});
module.exports = User;