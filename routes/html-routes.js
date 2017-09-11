
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads customer-manager.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/customer-manager.html"));
  });

  // orders route loads orders.html
  app.get("/orders", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/orders.html"));
  });
 // orders route loads orders.html
  app.get("/Orderactivity", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/Orderactivity.html"));
  });
  // customers route loads customer-manager.html
  app.get("/customers", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/customer-manager.html"));
  });

  // products route loads product-manager.html
  app.get("/products", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/product-manager.html"));
  });

};
