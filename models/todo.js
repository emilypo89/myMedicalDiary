module.exports = function(sequelize, DataTypes) {
  var ToDo = sequelize.define("ToDo", {
      toDo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      // We're saying that we want our User to have todo
      classMethods: {
        associate: function(models) {
          // Associating User with Todos
          // When an User is deleted, also delete any associated Todo
          ToDo.belongsTo(models.User, {
            onDelete: "cascade"
          });
        }
      }
  });
  return ToDo;
};
