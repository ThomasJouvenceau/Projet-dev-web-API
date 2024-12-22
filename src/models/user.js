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
Admin.addHook("beforeCreate", async (admin) => {
  admin.password = await bcrypt.hash(admin.password, await bcrypt.genSalt());
});

Admin.addHook("beforeUpdate", async (admin, { fields }) => {
  if (fields.includes("password"))
    admin.password = await bcrypt.hash(admin.password, await bcrypt.genSalt());
});
module.exports = User;