var db = require("../models");

module.exports = function(app) {
  app.get("/api/orders", function(req, res) {
    //Join Customer to thier Orders
    db.Order.findAll({
      include: [db.Orderitems]
    }).then(function(dbCustomer) {
      res.json(dbOrder);
    });
  });

  app.get("/api/orders/:id", function(req, res) {
    // Gets singe Customer and their Orders
    db.Order.findOne({
      include: [db.Orderitems],
      where: {
        id: req.params.id
      }
    }).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

  

app.post("/api/orders", function(req, res) {
    db.Order.create(req.body,{
       include: [{model: db.Orderitems}]
    }).then(function(order){
      order.setCustomer(req.body.Customerid)
    });
    
  });


  app.delete("/api/orders/:id", function(req, res) {
    db.Order.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

};
