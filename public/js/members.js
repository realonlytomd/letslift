$(document).ready(function() {
    
  // set up some variables
  var startCount = 0;
  var myTimer;
  var clicksofSetButton = -1;
  var indexofPreviousButton = 20;

    // This portion does a GET request to figure out which user is logged in
  $.get("/api/user_data").then(function(data) {
    //console.log("object 'data' inside of the first .get is ", data);
    $(".member-id").text(data.id);
    $(".member-name").text(data.email);

    //putting all of the below inside this get so as to have the correct id (user)
    // this .get brings in all the data but assigns only the names of the workouts 
    // that are available to the user
    $.get("/api/specific_user_data/" + data.id).then(function(data) {
      $("span#workoutA").text(data.workoutA);
    });

      // This function happens when the user clicks the chosen workout.
    $(".selectedWorkout").on("click", function(event) {
      // What happens? Hide previous divs. Show new actual workout div.
      // Build the workout page  -  where the user sees the title of workout, the exercises,
      // the weight, and corresponding sets buttons, and reps displayed after those buttons
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
          clicksofSetButton = -1;
          indexofPreviousButton = 20;
          $("#setsRepsButtonsExOne").empty();
      
              // create loop to go through the "array" of sets
          
          for (var i = 0; i < data.setsOneofA; i++) {
            var holder = $("<button>");

            holder.attr("type","button");
            holder.addClass("btn");
            holder.addClass("btn-success");
            holder.addClass("startTimer");
            holder.attr("data-reps", data.repsOneofA);
            holder.attr("data-clicksofSetButton", clicksofSetButton);
            holder.attr("data-chosenSet", i);
            holder.text("Reps");
            
            $("#setsRepsButtonsExOne").append(holder);
          }
        }

        function makeSetButtonsExTwo() {
          clicksofSetButton = -1;
          indexofPreviousButton = 20;
          $("#setsRepsButtonsExTwo").empty();
      
              // create loop to go through the "array" of sets
          
          for (var i = 0; i < data.setsTwoofA; i++) {
            var holder = $("<button>");

            holder.attr("type","button");
            holder.addClass("btn");
            holder.addClass("btn-success");
            holder.addClass("startTimer");
            holder.attr("data-reps", data.repsTwoofA);
            holder.attr("data-clicksofSetButton", clicksofSetButton);
            holder.attr("data-chosenSet", i);
            holder.text("Reps");
            
            $("#setsRepsButtonsExTwo").append(holder);
          }
        }

        makeSetButtonsExOne();
        makeSetButtonsExTwo();

        function timer() {
          //this span needs to be put in a fixed footer so user sees it on page while the
          //timer clock is running. Add a stop when workout is finished? (or somewhere before?)
          //So, there is no need for a different timer span for each exercise.
          $("span#timerDisplay").html(startCount);
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
          var indexofNewButton = parseInt($(this).attr("data-chosenSet"));
          
          // check to see if it's different than the previous button
          // so as to not start the timer over while user pics the number of reps completed.
          if (indexofNewButton !== indexofPreviousButton) {
            stopTimer();
            timer();
          }
          
          console.log("indexofNewButton is " + indexofNewButton);
          console.log("indexofPreviousButton is " + indexofPreviousButton);
          

            // there's a problem with going through some sets, but then if the user
            // clicks the named workout again, the buttons are redrawn,
            // but the old clicksofSetButton (and possibly other data) is not
            // reset. Thought I changed that, but the clicksofSetButton is increasing
            // by more than 1.
          clicksofSetButton = parseInt($(this).attr("data-clicksofSetButton"));
          reps = parseInt($(this).attr("data-reps"));
          console.log("clicksofSetButton from button: " + clicksofSetButton);
          clicksofSetButton = clicksofSetButton + 1;
          console.log("clicksofSetButton after adding 1: " + clicksofSetButton);
          $(this).attr("data-clicksofSetButton", clicksofSetButton);
          console.log("data-reps: " + reps);

          if (clicksofSetButton > reps) {
            $(this).text("Reps");
            clicksofSetButton = -1;
            $(this).attr("data-clicksofSetButton", clicksofSetButton);
            indexofPreviousButton = indexofNewButton;
          } else {
            $(this).html(reps - clicksofSetButton);
            indexofPreviousButton = indexofNewButton;
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