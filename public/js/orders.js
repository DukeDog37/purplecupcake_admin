$(document).ready(function() {
  
  var nameInput = $('#product-name');
  var descInput = $('#product-desc');
  var priceInput = $('#product-price');

  var productContainer = $(".product-container");
  var productList = $(".tb-products");

  var orderContainer = $(".order-container");
  var orderList = $(".tb-orderitems");
  var orderCategorySelect = $("#category");

  var customerContainer = $(".customer-container");
  //var customerList = $(".customerList");
  var customerSelect = $("#customer");
  var customerId;
  var orderitems;
  var products;
  var itemsToAdd = [];

  $(document).on("submit", "#order-form", handleOrderFormSubmit);
  $(document).on("click", ".additem", addOrderItems);

  function handleOrderFormSubmit(event) {
    event.preventDefault();
    //  console.log("itemsToAdd in order submit: " + itemsToAdd);
      customerId = customerSelect.val();
      console.log("cId: " + customerId + " cName: "+ customerSelect.text());
      
      var orderDetails = itemsToAdd;
      console.log(orderDetails);
      
      insertOrder({
        Customerid: customerId,
        orderdate: "01/01/2017",
          Orderitems: orderDetails});
 }
   
  function insertOrder(orderData) {
    console.log("in insertOrder " + orderData);
    $.post("/api/orders", orderData)
      .then(getProducts);
  }





  function addOrderItems() {
      
      var orderItem;
      var listItemData = $(this).parent("td").parent("tr").data("product");
      var listItemDataQuantity = 6;
      var id = listItemData.id;

      orderItem = { "productid": listItemData.id, "quantity": listItemDataQuantity, "price": parseFloat(listItemData.price).toFixed(2) };
      //Do not use JSON convert. orderItem goes straight into array as object
      //only need to JSON.stringify if you are printing to console
      //itemJSON = JSON.stringify(orderItem);
      //itemsToAdd.push(itemJSON);
      itemsToAdd.push(orderItem);
      console.log("adding array item: " + itemsToAdd);
      
      createOrderItemRow(orderItem);
      //disable add button so that only product type is only ordered once
      
      //call create item row for html
    }
//not used at the moment
function renderOrderItemList(rows) {
    //console.log(rows);
    orderList.children().not(":last").remove();
    orderContainer.children(".alert").remove();
    orderList.prepend(rows);
    
  }

 function createOrderItemRow(items) {
        console.log("items.id: " + items.id);
        var newTr = $("<tr>");
        newTr.append("<td id='productid'>" + items.productid + "</td>");
        newTr.append("<td id='productname'>" + items.name + "</td>");
        newTr.append("<td id='productprice'>" + items.price + "</td>");
        newTr.append("<td>" + items.quantity + "</td>");
        newTr.append("<td>" + (items.price * items.quantity) + "</td>");
        console.log(newTr);
        orderList.append(newTr);
  
      
    }
  
  function getCustomers() {
    $.get("/api/customers", renderCustomerList);
  }
  // Function to either render a list of customer, or if there are none, direct the user to the page
  // to create an customer first
  function renderCustomerList(data) {
    if (!data.length) {
      window.location.href = "/customers";
    }
    //$(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createCustomerRow(data[i]));
    }
    customerSelect.empty();
    //console.log(data);
    //console.log(customerSelect);
    customerSelect.append(rowsToAdd);
    customerSelect.val(customerId);
  }

  // Creates the customer options in the dropdown
  function createCustomerRow(customer) {
    var listOption = $("<option>");
    listOption.attr("value", customer.id);
    listOption.text(customer.firstname);
    return listOption;
  }

  getCustomers();


  function getProducts() {
    //console.log("get products call");
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
      newTr.append("<td id='quantity'> " + 
      "<select id='qty'> " +
      "<option>0</option>" +
      "<option>6</option>" +
      "<option>12</option>" +
      "<option>24</option>" + 
      "</select>" +
      " </td>");


      newTr.append("<td><button class='additem btn btn-danger btn-md' type='submit'>Add</button></td>");
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

    
  
  getProducts();
  


});
