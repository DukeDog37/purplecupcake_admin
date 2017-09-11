$(document).ready(function() {
  /* global moment */

  // blogContainer holds all of our posts
  var orderContainer = $(".order-container");
  var orderCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  // Variable to hold our posts
  var posts;

  // The code below handles the case where we want to get blog posts for a specific author
  // Looks for a query param in the url for author_id
  var url = window.location.search;
  var customerId;
  if (url.indexOf("?customer_id=") !== -1) {
    authorId = url.split("=")[1];
    getOrders(customerId);
  }
  // If there's no authorId we just get all posts as usual
  else {
    getOrders();
  }


  // This function grabs posts from the database and updates the view
  function getOrders(customer) {
    customerId = customer || "";
    if (customerId) {
      customerId = "/?customer_id=" + customerId;
    }
    $.get("/api/customers" + customerId, function(data) {
      console.log("Customers", data);
      orders = data;
      if (!orders || !orders.length) {
        displayEmpty(customer);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  /*function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    })
    .done(function() {
      getPosts(postCategorySelect.val());
    });
  }*/

  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows() {
    orderContainer.empty();
    var ordersToAdd = [];
    for (var i = 0; i < orders.length; i++) {
      ordersToAdd.push(createNewRow(orders[i]));
    }
    orderContainer.append(orderssToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(order) {
    var formattedDate = new Date(order.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newOrderPanel = $("<div>");
    newOrderPanel.addClass("panel panel-default");
    var newOrderPanelHeading = $("<div>");
    newOrderPanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newOrderTitle = $("<h2>");
    var newOrderDate = $("<small>");
    var newOrderAuthor = $("<h5>");
    newOrderAuthor.text("Ordered by: " + order.Customer.email);
    newOrderAuthor.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newOrderPanelBody = $("<div>");
    newOrderPanelBody.addClass("panel-body");
    var newOrderBody = $("<p>");
    newOrderTitle.text(post.title + " ");
    newOrderBody.text(post.body);
    newOrderDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    newPostPanelHeading.append(deleteBtn);
    newPostPanelHeading.append(editBtn);
    newPostPanelHeading.append(newPostTitle);
    newPostPanelHeading.append(newPostAuthor);
    newPostPanelBody.append(newPostBody);
    newPostPanel.append(newPostPanelHeading);
    newPostPanel.append(newPostPanelBody);
    newPostPanel.data("post", post);
    return newPostPanel;
  }

  /*// This function figures out which post we want to delete and then calls deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }*/

 /* // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/cms?post_id=" + currentPost.id;
  }*/

  // This function displays a messgae when there are no posts
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Customer #" + id;
    }
    orderContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No orders yet" + partial + ", navigate <a href='/orders" + query +
    "'>here</a> in order to get started.");
    orderContainer.append(messageh2);
  }

});
