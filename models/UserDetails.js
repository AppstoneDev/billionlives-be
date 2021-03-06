module.exports = (sequelize, DataTypes) => {
  const Userdetails = sequelize.define("Userdetails", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    mobile: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // validate: {
      //   notEmpty: true
      // }
    },
    group_name:{
      type: DataTypes.STRING,
      allowNull : false, 
      validate: {
        notEmpty : true
      }
    }
  })

  return Userdetails;
}