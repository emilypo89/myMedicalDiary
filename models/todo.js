module.exports = function(sequelize, DataTypes) {
  var ToDo = sequelize.define("ToDo", {
      toDo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
  });
  ToDo.associate = function(models){
    ToDo.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  }


  return ToDo;
};
