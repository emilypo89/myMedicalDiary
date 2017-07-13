module.exports = function(sequelize, DataTypes) {
  // creates a table for the to do items
  var ToDo = sequelize.define("ToDo", {
      toDo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
  });
  // associating the to do items table with the user
  ToDo.associate = function(models){
    ToDo.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  }


  return ToDo;
};
