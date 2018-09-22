$(document).ready(function() {
    
  // set up some variables
  var startCount = 0;
  var myTimer;
    // This portion does a GET request to figure out which user is logged in
    // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    //console.log("object 'data' inside of the first .get is ", data);
    $(".member-id").text(data.id);
    $(".member-name").text(data.email);
    //don't need this variable anymore - delete it when convenient
    var currentUser = data.id - 1;
    //putting all of the below inside this get so as to have the correct id (user)
    $.get("/api/specific_user_data/" + data.id).then(function(data) {
      $("span#workoutA").text(data.workoutA);
    });

      // This function happens when the user clicks the chosen workout.
    $(".selectedWorkout").on("click", function(event) {
      //what do I want to happen? Hide previous divs. Show new actual workout div.
      // Build the workout page  -  where the user sees the exercises
      // and corresponding sets buttons with for loops, the weight, and reps displayed after those buttons
      // are presssed.  Also the count up clock.
      $.get("/api/specific_user_data/" + data.id).then(function(data) {
        //console.log("data.workoutA = " + data.workoutA);
        //console.log("data.exerciseOneofA = " + data.exerciseOneofA);
        $("span#workoutA").text(data.workoutA);
        $("span#exerciseOneofA").text(data.exerciseOneofA);
        $("span#weightOneofA").text(" " + data.weightOneofA + "lb");
        $("span#setsOneofA").text(data.setsOneofA + " sets X ");
        $("span#repsOneofA").text(data.repsOneofA + " reps at ");

        //empty out the div containing sets/reps buttons
        $("#setsRepsButtons").empty();
      
              // create loop to go through the array of sets
          
          for (var i = 0; i < data.setsOneofA; i++) {
            var holder = $("<button>");
            //console.log("i = " + i);

            holder.attr("type","button");
            holder.addClass("btn");
            holder.addClass("btn-success");
            holder.addClass("startTimer");
            holder.text(data.repsOneofA);

            $("#setsRepsButtons").append(holder);
          }

    // I need to start and stop the time - maybe a full page modal to count up - 
    //shouldn't cover the buttons, as that starts the timer over - 
    // it's a timer for between sets
    //also, the reps number will be set to a new variable that counts down each time the button is pressed
    // AFTER the first time.  NOT the first time.
          
        
      });

    });
    
    //this function is started when the user clicks a set button after they have
    // finished the set of reps for an exercise. It starts the timer clock in the following div
    // so, it also has to stop the timer clock if it is currently running.

    function timer() {
      
      $("#timerDisplay").text(startCount);
      startCount = startCount + 1;
      myTimer = setTimeout(function(){ timer() }, 1000);
    }

    function stopTimer() {
        clearTimeout(myTimer);
    }
    
    $(document).on("click", ".startTimer", timer);
  

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
            console.log("object 'data' inside of the workouts button .get is ", data);
            //console.log("testing testing to find individual values - workout name: " + data.dbUser[currentUser].workoutA);
            $("#workoutA").text(data.workoutA);
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
    // this button may not be necessary since the function is already accomplished when page loads
    // and after a new workout is added in the form.
    $("#showWorkouts").on("click", function(event) {
      $.get("/api/specific_user_data/" + data.id).then(function(data) {
        console.log("object 'data' inside of the show workouts button .get is ", data);
        //console.log("testing testing to find individual values - workout name: " + data.dbUser[currentUser].workoutA);
        $("#workoutA").text(data.workoutA);
      });
    });
  });
});