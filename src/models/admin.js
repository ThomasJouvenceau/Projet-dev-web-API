const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const bcrypt = require("bcryptjs");

class Admin extends Model {}

Admin.init(
  {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
   
      },
    },
    role: {
      type: DataTypes.ENUM(["ROLE_USER", "ROLE_ADMIN"]),
      defaultValue: "ROLE_ADMIN",
      allowNull: false,
    },
    activated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize: connection,
  }
);

Admin.addHook("beforeCreate", async (admin) => {
  admin.password = await bcrypt.hash(admin.password, await bcrypt.genSalt());
});

Admin.addHook("beforeUpdate", async (admin, { fields }) => {
  if (fields.includes("password"))
    admin.password = await bcrypt.hash(admin.password, await bcrypt.genSalt());
});

module.exports = Admin;