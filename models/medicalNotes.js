module.exports = function(sequelize, DataTypes) {
  var medNotes = sequelize.define("medNotes", {
    // Giving the Author model a name of type STRING
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: DataTypes.STRING,
    content: DataTypes.TEXT,
  },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      // We're saying that we want our User to have medNotes
    classMethods: {
        associate: function(models) {
          // An User (foreignKey) is required or a medNote can't be made
          medNotes.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return medNotes;
};