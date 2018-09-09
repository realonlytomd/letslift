$(document).ready(function() {
    // This portion does a GET request to figure out which user is logged in
    // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    console.log("object 'data' inside of the first .get is ", data);
    $(".member-id").text(data.id);
    $(".member-name").text(data.email);

    //putting all of the below inside this get so as to have the correct id (user)

    // gets the current workoutA before the user has built a new one using the form
    $.get("/api/specific_user_data/" + data.id).then(function(data) {
      $("#workoutA").text(data.dbUser[0].workoutA);
    });
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
      } else {
        var currentURL = window.location.origin;
        $.ajax(currentURL + "/api/createWorkoutA/" + data.id, {
          type: "PUT",
          data: workoutAInputs
        }).then(function() {
          $.get("/api/specific_user_data/" + data.id).then(function(data) {
            //console.log("object 'data' inside of the workouts button .get is ", data);
            //console.log("testing testing to find individual values - workout name: " + data.dbUser[0].workoutA);
            $("#workoutA").text(data.dbUser[0].workoutA);
          });
        });
          //location.reload(true);
          // If there's an error, handle it by throwing up a boostrap alert
        
      // ...and empty out the input fields for the first exercise in the first workout
        $("input#workout-nameA").val("");
        $("input#exercise-oneA").val("");
        $("input#exercise-oneA-weight").val("");
        $("input#exercise-oneA-sets").val("");
        $("input#exercise-oneA-reps").val("");
      }
    });

    $("#showWorkouts").on("click", function(event) {
      $.get("/api/specific_user_data/" + data.id).then(function(data) {
        //console.log("object 'data' inside of the workouts button .get is ", data);
        //console.log("testing testing to find individual values - workout name: " + data.dbUser[0].workoutA);
        $("#workoutA").text(data.dbUser[0].workoutA);
      });
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
  