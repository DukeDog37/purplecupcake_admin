//$(document).ready(function() {
  
  var nameInput = $('#product-name');
  var descInput = $('#product-desc');
  var priceInput = $('#product-price');

  var productContainer = $(".product-container");
  var productList = $(".tb-products");

  var orderContainer = $(".order-container");
  var orderList = $(".tb-orderitems");
  var orderCategorySelect = $("#category");
  
  var orderitems;
  var products;

  $(document).on("submit", "#order-form", handleOrderFormSubmit);

  function handleOrderFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if at least one items is not checked for order
      console.log("in handleOrderFormSubmit");

    insertOrder({
      Customerid: 2 ,
      orderdate: "01/01/2017",
       Orderitems: [
          { productid: 1, quantity: 6, price: 3.33},
          { productid: 2, quantity: 12, price: 4.55}
          ]});

  }
     
  function insertOrder(orderData) {
    console.log("in insertOrder");
    $.post("/api/orders", orderData)
      .then(getProducts);
  }





  function addOrderItems() {
      var itemsToAdd = [];
      var orderItem;
      console.log(productList.children(this));

      //orderItem = { "id": productid, "name": productname, "price": productprice, "quantity": qty1 };
      //console.log("orderItem: " + orderItem);
      //itemJSON = JSON.stringify(orderItem);
      //itemsToAdd.push(itemJSON);
      //console.log(itemsToAdd);
      //renderOrderItemList(createOrderItemRow(itemsToAdd));
      //call create item row for html
    }

function renderOrderItemList(rows) {
    orderList.children().not(":last").remove();
    orderContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      orderList.prepend(rows);
    }
    else {
     
    }
  }

 function createOrderItemRow(items) {
      
      for(i=0; i < items.length; i++){
        
        var newTr = $("<tr>");
        newTr.append("<td id='productid'>" + items[i].id + "</td>");
        newTr.append("<td id='productname'>" + items[i].name + "</td>");
        newTr.append("<td id='productprice'>" + items[i].price + "</td>");
        newTr.append("<td>" + items[i].quantity + "</td>");
        newTr.append("<td>" + (items[i].price * items[i].quantity) + "</td>");
      }

      
    }
  

  function getProducts() {
    
    $.get("/api/products", function(data) {
      
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createProductRow(data[i]));
      }
      renderProductList(rowsToAdd);
      nameInput.val("");
      priceInput.val("");
      descInput.val("");
    });
  }

 
  function createProductRow(productData) {
      var newTr = $("<tr>");
      newTr.data("product", productData);
      newTr.append("<td id='productid'>" + productData.id + "</td>");
      newTr.append("<td id='productname'>" + productData.name + "</td>");
      newTr.append("<td id='productprice'>" + productData.price + "</td>");
      newTr.append("<td>" + productData.description + "</td>");
      newTr.append("<td> " + "<select class='form-control' id='qty1'> " +
      "<option>0</option>" +
      "<option>6</option>" +
      "<option>12</option>" +
      "<option>24</option>" + " </td>");


      newTr.append("<td><button onclick='addOrderItems()' class='additem btn btn-danger btn-md' type='submit'>Add</button></td>");
      return newTr;
    }
  
  function renderProductList(rows) {
    productList.children().not(":last").remove();
    productContainer.children(".alert").remove();
    if (rows.length) {
      productList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }



  
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.html("You must create a Product before you can create an Order.");
    productContainer.append(alertDiv);
  }

  

  

 
  
 
  
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Customer #" + id;
    }
    orderContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No orders yet" + partial + ", navigate <a href='/customers" + query +
    "'>here</a> in order to get started.");
    orderContainer.append(messageh2);
  }

    function createOrder(){


    }










  getProducts();


//});
