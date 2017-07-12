module.exports = function(sequelize, DataTypes) {
  var Doctor = sequelize.define("Doctor", {
    // Giving the Author model a name of type STRING
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      len: [1]
    }
  },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        not: ["[a-z]",'i']
      }
  },
    specialty: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: ["^[a-z]+$",'i']
      } 
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true
    }  
    },
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // Associating Author with Posts
          // When an Author is deleted, also delete any associated Posts
          Doctor.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
  });
  return Doctor;
};
