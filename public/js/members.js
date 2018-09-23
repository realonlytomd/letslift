$(document).ready(function() {
    
  // set up some variables
  var startCount = 0;
  var myTimer;
  var clicksOfSetButton = -1;
  var indexOfChosenSet = 20;

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
      
              // create loop to go through the array of sets
          
          for (var i = 0; i < data.setsOneofA; i++) {
            var holder = $("<button>");
            console.log("i = " + i);

            holder.attr("type","button");
            holder.addClass("btn");
            holder.addClass("btn-success");
            holder.addClass("startTimer");
            holder.attr("data-chosenSet", i);

            // if statement: 1st time through, text is empty, 
            // at 1st click: need to know which set button was clicked, we do because it has attr of i
            // this is not right just yet!!!!!!!!!!!!!
            // *************
            console.log("inside makeSetButtons func indexOfChosenSet = " + indexOfChosenSet);
            console.log("inside makeSetButtons func clicksOfSetButton = " + clicksOfSetButton);
            if (i === indexOfChosenSet) {
              console.log("i AM IN FIRST CONDITIONAL!");
              holder.html(data.repsOneofA - clicksOfSetButton);
            } else {
              holder.text(" ");
            } 
            
            $("#setsRepsButtons").append(holder);
          }
        }

        makeSetButtons();

    //also, the reps number will be set to a new variable that counts down each time
    //the button is pressed AFTER the first time.  NOT the first time.
          function timer() {
            $("#timerDisplay").text(startCount);
            startCount = startCount + 1;
            myTimer = setTimeout(function(){ timer() }, 1000);
          }

          function stopTimer() {
            clearTimeout(myTimer);
            startCount = 0;
          }
    
          // when a set button is clicked, this calls the timer function
          $(document).on("click", ".startTimer", function() {
            stopTimer();
            timer();
            // I need code here that counts the reps down with each push of the button
            // ...and doesn't start the timer over
            // ... and changes the text of just that button, not any of the others.
            //  so, at the beginning, each button's only unique property is the variable i,
            // in the for loop counter, so make that a data attribute. - done
            //
            clicksOfSetButton = clicksOfSetButton + 1;
            console.log("inside .startTimer onclick func - clicksOfSetButton = "+ clicksOfSetButton);

            // need to store the attribute 
            indexOfChosenSet = parseInt($(this).attr("data-chosenSet"));
            console.log("inside .startTimer onclick func - indexOfChosenSet = " + indexOfChosenSet);
            makeSetButtons();
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