$(document).ready(function() {
    
  // set up some variables
  var startCount = 0;
  var myTimer;
  var clicksOfSetButton = -1;
  var indexOfPreviousButton = 20;

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
        console.log("data.workoutA = " + data.workoutA);
        console.log("data.exerciseOneofA = " + data.exerciseOneofA);
        $("span#workoutA").text(data.workoutA);
        $("span#exerciseOneofA").text(data.exerciseOneofA);
        $("span#weightOneofA").text(" " + data.weightOneofA + "lb");
        $("span#setsOneofA").text(data.setsOneofA + " sets X ");
        $("span#repsOneofA").text(data.repsOneofA + " reps at ");
        $("span#exerciseTwoofA").text(data.exerciseTwoofA);
        $("span#weightTwoofA").text(" " + data.weightTwoofA + "lb");
        $("span#setsTwoofA").text(data.setsTwoofA + " sets X ");
        $("span#repsTwoofA").text(data.repsTwoofA + " reps at ");

        //empty out the div containing sets/reps buttons inside the makeSetbuttons function
        // make the creation of the set buttons into a function
        function makeSetButtonsExOne() {
          clicksOfSetButton = -1;
          indexOfPreviousButton = 20;
          $("#setsRepsButtonsExOne").empty();
      
              // create loop to go through the "array" of sets
          
          for (var i = 0; i < data.setsOneofA; i++) {
            var holder = $("<button>");

            holder.attr("type","button");
            holder.addClass("btn");
            holder.addClass("btn-success");
            holder.addClass("startTimer");
            console.log("data-reps: " + data.repsOneofA);
            holder.attr("data-reps", data.repsOneofA);
            holder.attr("data-clicksOfSetButton", clicksOfSetButton);
            holder.attr("data-chosenSet", i);
            holder.text("Reps");
            
            $("#setsRepsButtonsExOne").append(holder);
          }
        }

        function makeSetButtonsExTwo() {
          clicksOfSetButton = -1;
          indexOfPreviousButton = 20;
          $("#setsRepsButtonsExTwo").empty();
      
              // create loop to go through the "array" of sets
          
          for (var i = 0; i < data.setsTwoofA; i++) {
            var holder = $("<button>");

            holder.attr("type","button");
            holder.addClass("btn");
            holder.addClass("btn-success");
            holder.addClass("startTimer");
            holder.attr("data-reps", data.repsTwoofA);
            holder.attr("data-clicksOfSetButton", clicksOfSetButton);
            holder.attr("data-chosenSet", i);
            holder.text("Reps");
            
            $("#setsRepsButtonsExTwo").append(holder);
          }
        }

        makeSetButtonsExOne();
        makeSetButtonsExTwo();

        function timer() {
          $("#timerDisplay").html(startCount);
          startCount = startCount + 1;
          // set up to play a chime if startCount reaches 90, or whatever
          myTimer = setTimeout(function(){ timer() }, 1000);
        }

        function stopTimer() {
          clearTimeout(myTimer);
          startCount = 0;
        }

        // this function changes the .html (label) of each button
        // as the user clicks it. It must start at required number of reps
        // then go down by one with each press. after 0, it should go back to
        // REPS.  then start over.
        $(document).on("click", ".startTimer", function() {

          // Need to not stop and restart timer after each press of the same button
          // so set the variable that picks which button was just clicked
          var indexOfNewButton = parseInt($(this).attr("data-chosenSet"));
          
          // check to see if it's different than the previous button
          if (indexOfNewButton !== indexOfPreviousButton) {
            stopTimer();
            timer();
          }
          
          console.log("indexOfNewButton is " + indexOfNewButton);
          console.log("indexOfPreviousButton is " + indexOfPreviousButton);
          

            // there's a problem with going through some sets, but then if the user
            // clicks the named workout again, the buttons are redrawn,
            // but the old clicksOfSetButton (and possibly other data) is not
            // reset. Thought I changed that, but the clicksOfSetButton is increasing
            // by more than 1.
          clicksOfSetButton = parseInt($(this).attr("data-clicksOfSetButton"));
          reps = parseInt($(this).attr("data-reps"));
          console.log("clicksOfSetButton from button: " + clicksOfSetButton);
          clicksOfSetButton = clicksOfSetButton + 1;
          console.log("clicksOfSetButton after adding 1: " + clicksOfSetButton);
          $(this).attr("data-clicksOfSetButton", clicksOfSetButton);
          console.log("data-reps: " + reps);

          if (clicksOfSetButton > reps) {
            $(this).text("Reps");
            clicksOfSetButton = -1;
            $(this).attr("data-clicksOfSetButton", clicksOfSetButton);
            indexOfPreviousButton = indexOfNewButton;
          } else {
            $(this).html(reps - clicksOfSetButton);
            indexOfPreviousButton = indexOfNewButton;
          }
        });

      });

    });

    // When the submit button for building a workout is clicked,
    $("form.enterWorkoutA").on("submit", function(event) {
      event.preventDefault();
      // build the data object to be put into the database
      var workoutAInputs = {
        workoutA: $("input#workout-nameA").val().trim(),
        exerciseOneofA: $("input#exercise-OneA").val().trim(),
        weightOneofA:$("input#exercise-OneA-weight").val().trim(),
        setsOneofA: $("input#exercise-OneA-sets").val().trim(),
        repsOneofA: $("input#exercise-OneA-reps").val().trim(),
        exerciseTwoofA: $("input#exercise-TwoA").val().trim(),
        weightTwoofA:$("input#exercise-TwoA-weight").val().trim(),
        setsTwoofA: $("input#exercise-TwoA-sets").val().trim(),
        repsTwoofA: $("input#exercise-TwoA-reps").val().trim()
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
        $("input#exercise-OneA").val("");
        $("input#exercise-OneA-weight").val("");
        $("input#exercise-OneA-sets").val("");
        $("input#exercise-OneA-reps").val("");
        $("input#exercise-TwoA").val("");
        $("input#exercise-TwoA-weight").val("");
        $("input#exercise-TwoA-sets").val("");
        $("input#exercise-TwoA-reps").val("");
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