var db = require("../models");

module.exports = function(app) {
  app.get("/api/orders", function(req, res) {
    //Gets all Order and the corresponding orderitem data
    db.Order.findAll({
      include: [db.Orderitems]
    }).then(function(dbCustomer) {
      res.json(dbOrder);
    });
  });

  app.get("/api/orders/:id", function(req, res) {
    // Gets a single order, by id, and its corresponding orderitem data
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
    //Saves a new order entry and its orderitems; then sets the customerid foreign key in the order table entry
    console.log(req.body);
    db.Order.create(req.body,{
       include: [{model: db.Orderitems}]
    }).then(function(order){
      order.setCustomer(req.body.Customerid)
    });
    
  });


  app.delete("/api/orders/:id", function(req, res) {
    //Will delete a single order, including its corresponding items.
    db.Order.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

};
