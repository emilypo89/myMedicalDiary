module.exports = function(sequelize, DataTypes) {
// creates a table for appointments
  var Appointment = sequelize.define("Appointment", {
  date: {
      type: DataTypes.DATEONLY,
  },
    time: {
      type: DataTypes.STRING,
  },
    category: {
      type: DataTypes.STRING,
  },
    location: {
      type: DataTypes.STRING,
  },
  title: {
      type: DataTypes.STRING,
  },
    notes: {
      type: DataTypes.STRING,
      allowNull: true
    }  
  });

// associates the appointments with the user table 
  Appointment.associate = function(models){
    Appointment.belongsTo(models.User)
  }
  return Appointment;
};
