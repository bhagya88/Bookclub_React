'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Book.belongsTo(models.Event);
        Book.hasMany(models.Rating);
      }
    }
  });
  return Book;
};