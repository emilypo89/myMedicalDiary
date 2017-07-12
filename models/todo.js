module.exports = function(sequelize, DataTypes) {
  var ToDo = sequelize.define("ToDo", {
      toDo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    // },
    // {
    //   // We're saying that we want our User to have todo
    //   classMethods: {
    //     associate: function(models) {
    //       // Associating User with Todos
    //       ToDo.belongsTo(models.User, {
    //         foreignKey: {
    //           allowNull: false
    //         }
    //       });
    //     }
    //   }
  });
  ToDo.associate = function(models){
    ToDo.belongsTo(models.User
    //   , {
    //   foreignKey: {
    //     allowNull: false
    //    } 
    // }
    )
  }


  return ToDo;
};
