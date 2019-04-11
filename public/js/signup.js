$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $("form.signup");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
  
    // When the signup button is clicked, we validate the email and password are not blank
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
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    });
  
    // Does a post to the signup route. If succesful, it directs to the members page
    // Otherwise, an error (could be given to the user), but for now, a modal pops up
    // showing an error in entering the email has been made
    
    function signUpUser(email, password) {
      $.post("/api/signup", {
        email: email,
        password: password
      }).then(function(data) {
        console.log("in /api/signup post, data is: ", data);  //WHY is this printing out if 
        // I have a .catch??  and the variable data here, is what I've said below is errValue????
        // maybe: add if data is not /members, set it to /signup??
        window.location.replace(data); // SHOULD be data variable, in (). this DOES go to /signup correctly, 
        // BUT, it really should be data, as if created properly, data is /members, but
        // it goes to the /members page as it should
        // STILL need data to NOT be what I thought was going into errValue, but
        // that is consistantly not defined, even though it seems to be on the server side.
        // sign
        // If there's an error, handle it by throwing up a boostrap alert
      }).catch(handleLoginErr());
    
      // I've stopped here...its calling this even if it works. I need it to only
      // call it if it's an error. 
      // so.... overall, if I res.json(err), it goes to a nonexistant page, if I leave it out,
      // it works, but the following function is called whether there is an error catch,
      // or not!  the modal disappears, but still....
      // 
    }
  
    function handleLoginErr() {
      console.log("In handleLoginErr!");
      //window.location.replace("/signup");
      $("#signupNote").modal("show");
      // $("#alert.msg").text(err.responseJSON);
      // $("#alert").fadeIn(500);
    }
  });
  