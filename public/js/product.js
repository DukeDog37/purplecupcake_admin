$(document).ready(function() {
  
  var nameInput = $('#product-name');
  var descInput = $('#product-desc');
  var priceInput = $('#product-price');
  var imgInput = $('#product-image');
  var productList = $("tbody");
  var productContainer = $(".product-container");
 
  $(document).on("submit", "#product-form", handleProductFormSubmit);
  $(document).on("click", ".delete-product", handleDeleteButtonPress);

  
  getProducts();

  
  function handleProductFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    if (!descInput.val().trim().trim()) {
      alert("You must enter a description.");
      return;
    }
    if (!imgInput.val().trim().trim()) {
      alert("You must enter an image name.");
      return;
    }
    
    upsertProduct({
      name: nameInput.val().trim(),
      description: descInput.val().trim(),
      imgname: imgInput.val().trim(),
      price: parseFloat(priceInput.val()).toFixed(2)
    });
  }

  
  function upsertProduct(productData) {
    
    $.post("/api/products", productData)
      .then(getProducts);
  }

  
  function createProductRow(productData) {
    var newTr = $("<tr>");
    newTr.data("product", productData);
    newTr.append("<td>" + productData.name + "</td>");
    newTr.append("<td>" + productData.name + "</td>");
    newTr.append("<td>" + productData.price + "</td>");
    newTr.append("<td><img src='../images/" + productData.imgname + "'</img></td>");
    newTr.append("<td>" + productData.description + "</td>");
    newTr.append("<td><a href='/products?product_id=" + productData.id + "'>Update Product Info</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-product'>Delete Product</a></td>");
    return newTr;
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
      imgInput.val("");
      descInput.val("");
    });
  }

  function renderProductList(rows) {
    productList.children().not(":last").remove();
    productContainer.children(".alert").remove();
    if (rows.length) {
      //console.log(rows);
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

 
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("product");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/products/" + id
    })
    .done(getProducts);
  }
});
