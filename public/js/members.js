$(document).ready(function() {
    // This portion does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
      $(".member-id").text(data.id);
      $(".member-name").text(data.email);
    //putting all of the below inside this get.

    // When the submit button for building a workout is clicked,
    $("form.enterWorkoutA").on("submit", function(event) {
      event.preventDefault();
      // build the data object to be put into the database
      var workoutAInputs = {
        workoutA: $("input#workout-nameA").val().trim(),
        exerciseOneofA: $("input#exercise-oneA").val().trim(),
        weightOneofA:$("input#exercise-oneA-weight").val().trim(),
        setsOneofA: $("input#exercise-oneA-sets").val().trim(),
        repsOneofA: $("input#exercise-oneA-reps").val().trim()
      };
      
      //make sure the workout at least has a name
      if (!workoutAInputs.workoutA) {
        //maybe add an alert here?
        return;
      }
      $.ajax("/api/createWorkoutA/" + data.id, {
        type: "PUT",
        data: workoutAInputs
      }).then(function(result) {
        window.location.replace(result);
        // If there's an error, handle it by throwing up a boostrap alert
      });
      // ...and empty out the input fields for the first exercise in the first workout
      $("input#workout-nameA").val("");
      $("input#exercise-oneA").val("");
      $("input#exercise-oneA-weight").val("");
      $("input#exercise-oneA-sets").val("");
      $("input#exercise-oneA-reps").val("");
    });
    //  I'm leaving this here as reference in case I need to add later the currentURL variable for deployment
    // This is the old burgers homework portion that will be redone for letslift
    // $(".change-devour").on("click", function(event) {
    //   var id = $(this).data("id");
    //   var newDevour = $(this).data("newdevour");
  
    //   var newDevourState = {
    //     devoured: newDevour
    //   };

    //   var currentURL = window.location.origin;
    //   // Send the PUT request.
    //   $.ajax(currentURL + "/api/burgers/" + id, {
    //     type: "PUT",
    //     data: newDevourState
    //   }).then(
    //     function() {
    //       console.log("changed devour to", newDevour);
    //       // Reload the page to get the updated list
    //       location.reload();
    //     }
    //   );
    // });
    });
  });
  