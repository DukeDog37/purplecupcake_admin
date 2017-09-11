$(document).ready(function() {
  
  //var nameInput = $("#customer-name");
  //var emailInput = $('#customer-email');
  var customerList = $("tbody");
  var customerContainer = $(".customer-container");

  var vfirstname = $("#customer-fname");
  var vlastname = $("#customer-lname");
  var vemail = $("#customer-email");
  var vpassword = $("#customer-password");
  var vaddr1 = $("#customer-addr1");
  var vaddr2 = $("#customer-addr2");
  var vcity = $("#customer-city");
  var vstate = $("#customer-state");
  var vzip = $("#customer-zip");

  
  $(document).on("submit", "#customer-form", handleCustomerFormSubmit);
  $(document).on("click", ".delete-customer", handleDeleteButtonPress);

  
  getCustomers();

  
  function handleCustomerFormSubmit(event) {
    event.preventDefault();
   
      
    /*if (!vemail.val().trim().trim()) {
      alter("You must enter a valid email address.");
      return;
    }*/
   
    insertCustomer({
      firstname: vfirstname.val().trim(),
      lastname: vlastname.val().trim(),
      email: vemail.val().trim(),
      password: vpassword.val().trim(),
      addr1: vaddr1.val().trim(),
      addr2: vaddr2.val().trim(),
      city: vcity.val().trim(),
      state: vstate.val().trim(),
      zip: vzip.val().trim()
    });
  }

  
  function insertCustomer(customerData) {
    console.log(customerData);
    $.post("/api/customers", customerData)
      .then(getCustomers);
  }


  function createCustomerRow(customerData) {
    
    console.log(customerData);
    var newTr = $("<tr>");
    newTr.data("customer", customerData);
    newTr.append("<td>" + customerData.firstname + "</td>");
    newTr.append("<td>" + customerData.lastname + "</td>");
    newTr.append("<td>" + customerData.email + "</td>");
    newTr.append("<td>" + customerData.password + "</td>");
    newTr.append("<td>" + customerData.addr1 + "</td>");
    newTr.append("<td>" + customerData.addr2 + "</td>");
    newTr.append("<td>" + customerData.city + "</td>");
    newTr.append("<td>" + customerData.state + "</td>");
    newTr.append("<td>" + customerData.zip + "</td>");
    newTr.append("<td><a href='/Orderactivity?customerid=" + customerData.id + "'>Go to Orders</a></td>");
    newTr.append("<td><a href='/orders?customerid=" + customerData.id + "'>Create new Order</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-customer'>Delete Customer</a></td>");
    return newTr;
  }

  
  function getCustomers() {
    console.log("in getCustomers");
    $.get("/api/customers", function(data) {
      var rowsToAdd = [];
      console.log(data.length);
      for (var i = 0; i < data.length; i++) {
        console.log("in for loop");
        console.log(data[i]);
        rowsToAdd.push(createCustomerRow(data[i]));
      }
      renderCustomerList(rowsToAdd);
      vfirstname.val("");
      vlastname.val("");
      vemail.val("");
      vpassword.val("");
      vaddr1.val("");
      vaddr2.val("");
      vcity.val("");
      vstate.val("");
      vzip.val("");

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
