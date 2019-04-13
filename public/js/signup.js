$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $("form.signup");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
    // When the signup button is clicked, the email and password are both checked to be entered.
    signUpForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.email || !userData.password) {
        $("#signupNote").modal("show");
        return;
      }
      // If both email and password are entered, run the signUpUser function
      signUpUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    });
  
    // Does a post to the signup route. If succesful, it directs to the members page
    // Otherwise, an error pops up a modal
    // showing an error in entering the email.
    
    function signUpUser(email, password) {
      $.post("/api/signup", {
        email: email,
        password: password
      }).then(function(data) {
        console.log("in /api/signup post, data is: ", data);
        // If user enters correct format for email,
        // then the variable "data" is "/members".
        // An incorrect login name flagged in api-routes.js sends back the incorrect name.
        if (data === "/members") {
          console.log("in if statement, data = /members");
          window.location.replace(data);
        } else {
          handleLoginErr(data);
        }
      }).catch();
    }
  
    function handleLoginErr(data) {
      console.log("In handleLoginErr! data = " + data);
      // brings in the email that was flagged as an error in api/signup.js
      $("#wrongName").text(data);
      $("#signupNote").modal("show");
      // $("#alert.msg").text(err.responseJSON);
      // $("#alert").fadeIn(500);
    }
  });
  