$(document).ready(function() {
  
  //var nameInput = $("#customer-name");
  //var emailInput = $('#customer-email');
  var customerList = $("tbody");
  var customerContainer = $(".customer-container");

  var vfirstname = "customer fn 1";
  var vlastname = "customer ln 1";
  var vemail = "email@email.com";
  var vpassword = "password";
  var vaddr1 = "Addr 1";
  var vaddr2 = "Addr 2";
  var vcity = "City";
  var vstate = "State";
  var vzip = "22101"; 

  
  $(document).on("submit", "#customer-form", handleCustomerFormSubmit);
  $(document).on("click", ".delete-customer", handleDeleteButtonPress);

  
  getCustomers();

  
  function handleCustomerFormSubmit(event) {
    event.preventDefault();
   
    /*if (!nameInput.val().trim().trim()) {
      return;
    }
    if (!emailInput.val().trim().trim()) {
      alter("You must enter a valid email address.");
      return;
    }*/
   
    insertCustomer({
      firstname: vfirstname,
      lastname: vlastname,
      email: vemail,
      password: vpassword,
      addr1: vaddr1,
      addr2: vaddr2,
      city: vcity,
      state: vstate,
      zip: vzip
    });
  }

  
  function insertCustomer(customerData) {
    $.post("/api/customers", customerData)
      .then(getCustomers);
  }


  function createCustomerRow(customerData) {
    var newTr = $("<tr>");
    newTr.data("customer", customerData);
    newTr.append("<td>" + customerData.name + "</td>");
    newTr.append("<td>" + customerData.email + "</td>");
    newTr.append("<td> " + customerData.Orders.length + "</td>");
    newTr.append("<td><a href='/orders?customerid=" + customerData.id + "'>Go to Orders</a></td>");
    newTr.append("<td><a href='/cms?customerid=" + customerData.id + "'>Create new Order</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-customer'>Delete Customer</a></td>");
    return newTr;
  }

  
  function getCustomers() {
    $.get("/api/customers", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createCustomerRow(data[i]));
      }
      renderCustomerList(rowsToAdd);
      nameInput.val("");
      emailInput.val("");
    });
  }

  
  function renderCustomerList(rows) {
    customerList.children().not(":last").remove();
    customerContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      customerList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.html("You must create a Customer before you can create an Order.");
    customerContainer.append(alertDiv);
  }

  
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("customer");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/customers/" + id
    })
    .done(getCustomers);
  }
});
