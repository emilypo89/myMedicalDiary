module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      len: [1]
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
  },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      // We're saying that we want our User to have medNotes, todo, doctor
      classMethods: {
        associate: function(models) {
          // Associating User with the medNotes, todo, and doctors
          User.hasMany(models.medNotes, {
            onDelete: "cascade"
          });

          User.hasMany(models.Todo, {
            onDelete: "cascade"
          });

          User.hasMany(models.Doctors {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return User;
};
