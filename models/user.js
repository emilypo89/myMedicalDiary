module.exports = function(sequelize, DataTypes) {
  // creating a user table
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

  // associating the appointment, to do, medical notes, and doctor tables to the user
  User.associate = function(models){
    User.hasMany(models.Appointment)
    User.hasMany(models.ToDo)
    User.hasMany(models.MedNotes)
    User.hasMany(models.Doctor)

  }

  return User;
};
