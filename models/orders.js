module.exports = function(sequelize, DataTypes) {
  var Orders = sequelize.define("Orders", {
    orderdate: DataTypes.DATE
        
  });

  Orders.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Orders.hasMany(models.Orderitem, {
      onDelete: "cascade"
    });
  };

  return Orders;
};
