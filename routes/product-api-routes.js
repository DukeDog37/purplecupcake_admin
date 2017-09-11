var db = require("../models");

module.exports = function(app) {
  app.get("/api/products", function(req, res) {
    //Get all product information
    db.Product.findAll({      
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  app.get("/api/products/:id", function(req, res) {
    // Gets a single product by id
    db.Product.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  app.post("/api/products", function(req, res) {
    //Creates a new product
    db.Product.create(req.body).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  app.delete("/api/products/:id", function(req, res) {
    //Deletes a single product
    db.Product.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

};
