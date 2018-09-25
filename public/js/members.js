$(document).ready(function() {
    
  // set up some variables
  var startCount = 0;
  var myTimer;
  var clicksOfSetButton = -1;
  var indexOfChosenSet = 20;
  var changedNumberOfSets = [];

    // This portion does a GET request to figure out which user is logged in
  $.get("/api/user_data").then(function(data) {
    //console.log("object 'data' inside of the first .get is ", data);
    $(".member-id").text(data.id);
    $(".member-name").text(data.email);

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

        //empty out the div containing sets/reps buttons inside the makeSetbuttons function
        // make the creation of the set buttons into a function
        function makeSetButtons() {
        
          $("#setsRepsButtons").empty();
      
              // create loop to go through the "array" of sets
          
          for (var i = 0; i < data.setsOneofA; i++) {
            var holder = $("<button>");

            holder.attr("type","button");
            holder.addClass("btn");
            holder.addClass("btn-success");
            holder.addClass("startTimer");
            holder.attr("data-chosenSet", i);

            // console.log("changedNumberOfSets[i] = " + changedNumberOfSets[i]);
            // if (changedNumberOfSets[i]) {
            //   console.log("in first conditional: i = " + i);
            //   console.log("changedNumberOfSets[i] = " + changedNumberOfSets[i]);
            //   changedNumberOfSets[i] = data.repsOneofA - clicksOfSetButton;
            //   holder.html(changedNumberOfSets[i]);
            // } else if (i === indexOfChosenSet) {
            //   console.log("IN SECOND CONDITIONAL of building setButtons: i = " + i);
            //   changedNumberOfSets[i] = data.repsOneofA - clicksOfSetButton;
            //   holder.html(changedNumberOfSets[i]);
            // } else {
                  // add test if button has been clicked before
                  // if not, then .text(" ")  is good, but ...
                  // if it has been clicked before, then last entered rep number should remain.
                  // so, just need to check if it ISN'T " ", then don't change it.
                  // what does that look like? if (holder.html(etc)) { then don't change it }
                  // I need a new variable that stores it to rewrite later...
                  // maybe look at NOT emptying out the row of buttons, just check if i is
                  // the one I want, then changing that one, after the initial creation of buttons?
              
            holder.text("Reps");
            
            $("#setsRepsButtons").append(holder);
          }
        }

        makeSetButtons();

        function timer() {
          $("#timerDisplay").html(startCount);
          startCount = startCount + 1;
          myTimer = setTimeout(function(){ timer() }, 1000);
        }

        function stopTimer() {
          clearTimeout(myTimer);
          startCount = 0;
        }
    
          // when a set button is clicked, this calls the timer function
          //HOWEVER, it should not be stopped and started with each press...(fix this) -
          //
        $(document).on("click", ".startTimer", function() {

          clicksOfSetButton = clicksOfSetButton + 1;
          if (clicksOfSetButton > data.repsOneofA) {
            clicksOfSetButton = -1;
            indexOfChosenSet = 20;
          }
          stopTimer();
          timer();

          $(this).html(data.repsOneofA - clicksOfSetButton);
          });

      });

    });
    
    //this function is started when the user clicks a set button after they have
    // finished the set of reps for an exercise. It starts the timer clock in the following div
    // so, it also has to stop the timer clock if it is currently running.

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