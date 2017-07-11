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
    notes: {
      type: DataTypes.STRING,
      allowNull: true
    }  
  },
    {
      // We're saying that we want our user to have appointments
      classMethods: {
        associate: function(models) {
          Appointment.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });

          Appointment.belongsTo(models.Doctor, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
  });
  return Appointment;
};
