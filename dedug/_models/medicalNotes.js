module.exports = function(sequelize, DataTypes) {
  var MedNotes = sequelize.define("MedNotes", {
    // Giving the Author model a name of type STRING
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: DataTypes.STRING,
    content: DataTypes.TEXT,
  },
    {
      // We're saying that we want our User to have medNotes
    classMethods: {
        associate: function(models) {
          // An User (foreignKey) is required or a medNote can't be made
          MedNotes.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return MedNotes;
};