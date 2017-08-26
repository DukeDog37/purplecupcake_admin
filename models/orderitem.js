module.exports = function(sequelize, DataTypes) {
  var Orderitem = sequelize.define("Orderitem", {
    productid: DataTypes.INTEGER    
  });

  return Orderitem;
};
