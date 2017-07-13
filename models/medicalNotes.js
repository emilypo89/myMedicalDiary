module.exports = function(sequelize, DataTypes) {
  var MedNotes = sequelize.define("MedNotes", {
   // creating a table for the medical notes
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: DataTypes.STRING,
    content: DataTypes.TEXT,
    category: DataTypes.STRING
  });

// associating the medical notes table with the user table
  MedNotes.associate = function(models){
    MedNotes.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  }  

  return MedNotes;
};