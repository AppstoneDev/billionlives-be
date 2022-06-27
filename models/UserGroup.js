module.exports = (sequelize, DataTypes) => {
  const Usergroup = sequelize.define("Usergroup", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  })

  return Usergroup;
}