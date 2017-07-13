module.exports = function(sequelize, DataTypes) {
  var Doctor = sequelize.define("Doctor", {
  // Create a table of doctor
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
    speciality: {
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
// associating the doctor table with the user table
  Doctor.associate = function(models){
    Doctor.belongsTo(models.User)
  }
  return Doctor;
};
