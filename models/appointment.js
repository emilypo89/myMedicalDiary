module.exports = function(sequelize, DataTypes) {
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
  Appointment.associate = function(models){
    Appointment.belongsTo(models.User)
  }
  return Appointment;
};
