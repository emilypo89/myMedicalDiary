module.exports = function(sequelize, DataTypes) {
  var MedNotes = sequelize.define("MedNotes", {
    // Giving the Author model a name of type STRING
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: DataTypes.STRING,
    content: DataTypes.TEXT,
    category: DataTypes.STRING
  });


  MedNotes.associate = function(models){
    MedNotes.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  }  

  return MedNotes;
};