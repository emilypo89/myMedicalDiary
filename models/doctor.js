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
  });

  Doctor.associate = function(models){
    Doctor.belongsTo(models.User)
  }
  return Doctor;
};
