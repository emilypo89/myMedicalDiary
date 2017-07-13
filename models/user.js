module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }, 
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    } 
  });
  User.associate = function(models){
    User.hasMany(models.Appointment)
    User.hasMany(models.ToDo)
    User.hasMany(models.MedNotes)
    User.hasMany(models.Doctor)

  }

  return User;
};
