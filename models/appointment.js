module.exports = function(sequelize, DataTypes) {
  var Appointment = sequelize.define("Appointment", {
    doctor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      len: [1]
    }
  },
    date: {
      type: DataTypes.STRING,
  },
    time: {
      type: DataTypes.STRING,
  },
  category: {
      type: DataTypes.STRING,
  },
    notes: {
      type: DataTypes.STRING,
      allowNull: true
    }  
  // },
  //   // Here we'll pass a second "classMethods" object into the define method
  //   // This is for any additional configuration we want to give our models
  //   {
  //     // We're saying that we want our Author to have Posts
  //     classMethods: {
  //       associate: function(models) {
  //         // Associating Author with Posts
  //         // When an Author is deleted, also delete any associated Posts
  //         Doctor.belongsTo(models.User, {
  //           onDelete: "cascade"
  //         });
  //       }
  //     }
  });
  return Appointment;
};
