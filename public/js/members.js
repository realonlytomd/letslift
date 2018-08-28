$(document).ready(function() {
    // This portion does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
      $(".member-id").text(data.id);
      $(".member-name").text(data.email);
    //putting all of the below inside this get.

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
        //maybe add an alert here?
        return;
      }
      // If we have the necessary inputs, run the createWorkoutA function
      createWorkoutA(workoutAData.workoutnameA, workoutAData.exerciseOneA, workoutAData.weightOneA, workoutAData.setsOneA, workoutAData.repsOneA);
      // ...and empty out the input fields for the first exercise in the first workout
      workoutnameAInput.val("");
      exerciseOneAInput.val("");
      weightOneAInput.val("");
      setsOneAInput.val("");
      repsOneAInput.val("");
    });

    function createWorkoutA(workoutnameA, exerciseOneA, weightOneA, setsOneA, repsOneA) {
      $.post("/api/createWorkoutA", {
        workoutnameA: workoutnameA,
        exerciseOneA: exerciseOneA,
        weightOneA: weightOneA,
        setsOneA: setsOneA,
        repsOneA: repsOneA
      }).then(function(data) {
        window.location.replace(data);
        // If there's an error, handle it by throwing up a boostrap alert
      });
    }

    //  I'm leaving this here as reference in case I need to add later the currentURL variable for deployment

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
    });
  });
  