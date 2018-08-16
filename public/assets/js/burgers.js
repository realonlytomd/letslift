
$(document).ready(function() {
    // For signup section
    // When the signup button is clicked, we validate the email and password are not blank
    $("form.signup").on("submit", function(event) {
      event.preventDefault();
      var userData = {
        email: $("input#email-input").val().trim(),
       password: $("input#password-input").val().trim()
      };

      if (!userData.email || !userData.password) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
      });

      // Does a post to the signup route. If succesful, we are redirected to the members page
      // Otherwise we log any errors
      function signUpUser(email, password) {
        $.post("/api/signup", {
          email: email,
          password: password
        }).then(function(data) {
          window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
        }).catch(handleLoginErr);
      }

      function handleLoginErr(err) {
        $("#alert.msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
      }
    // For login portion
    // Getting references to our form and inputs
    var loginForm = $("form.login");
    var emailInput = $("input#email-login-input");
    var passwordInput = $("input#password-login-input");

    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };

      if (!userData.email || !userData.password) {
        return;
      }

      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
      $.post("/api/login", {
        email: email,
        password: password
      }).then(function(data) {
        window.location.replace(data);
        // If there's an error, log the error
      }).catch(function(err) {
        console.log(err);
      });
    }

    // This is the members portion
    $.get("/api/user_data").then(function(data) {
      $("#member-id").text(data.id);
      $("#member-name").text(data.email);
    });  

    // This is the old burgers homework portion that will be redone for letslift
    $(".change-devour").on("click", function(event) {
      var id = $(this).data("id");
      var newDevour = $(this).data("newdevour");
  
      var newDevourState = {
        devoured: newDevour
      };

      var currentURL = window.location.origin;
      // Send the PUT request.
      $.ajax(currentURL + "/api/burgers/" + id, {
        type: "PUT",
        data: newDevourState
      }).then(
        function() {
          console.log("changed devour to", newDevour);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $("#createburger").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newBurger = {
        burger_name: $("#newname").val().trim(),
        devoured: false
      };
  
      var currentURL = window.location.origin;
      // Send the POST request.
      $.ajax(currentURL + "/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });

  
  