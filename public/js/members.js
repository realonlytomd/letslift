$(document).ready(function() {
    // This portion does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
      $(".member-id").text(data.id);
      $(".member-name").text(data.email);
    });

    // Getting references to the input form for building a workout
    var workoutAForm = $("form.enterWorkoutA");
    var workoutnameAInput = $("input#workout-nameA");
    var exerciseOneAInput = $("input#exercise-oneA");
    var weightOneAInput = $("input#exercise-oneA-weight");
    var setsOneAInput = $("input#exercise-oneA-sets");
    var repsOneAInput = $("input#exercise-oneA-reps");

    // When the submit button for building a workout is clicked, 
    //
    workoutAForm.on("submit", function(event) {
      event.preventDefault();
      // build the data object to be put into the database
      var workoutAData = {
        workoutnameA: workoutnameAInput.val().trim(),
        exerciseOneA: exerciseOneAInput.val().trim(),
        weightOneA: weightOneAInput.val().trim(),
        setsOneA: setsOneAInput.val().trim(),
        repsOneA: repsOneAInput.val().trim()
      };
      
      //make sure the workout at least has a name
      if (!workoutAData.workoutnameA) {
        return;
      }
      // If we have an the necessary inputs, run the createWorkoutA function
      createWorkoutA(workoutAData.workoutnameA, workoutAData.exerciseOneA, workoutAData.weightOneA, workoutAData.setsOneA, workoutAData,repsOneA);
      workoutnameAInput.val("");
      exerciseOneAInput.val("");
      weightOneAInput.val("");
      setsOneAInput.val("");
      repsOneAInput.val("");
    });

    function createWorkoutA(workoutnameA, exerciseOneA, weightOneA, setsOneA, repsOneA) {
      $.post("/api/signup", {
        email: email,
        password: password
      }).then(function(data) {
        window.location.replace(data);
        // If there's an error, handle it by throwing up a boostrap alert
      }).catch(handleLoginErr);
    }


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
  