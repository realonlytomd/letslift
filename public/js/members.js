$(document).ready(function() {
    //start with the footer showing the timer hidden. It appears when the timer is counting
    $("#currentWorkout").hide();
    $(".footer").hide();
  // set up some variables
  var startCount = 0;
  var myTimer;
  var clicksofSetButton = -1;
  var indexofPreviousButton = 20;
  var selectedWorkout;
  // in progress: not sure what arrays I need:
  var workout = [];
  var exercise = [];
  var weight = [];
  var sets = [];
  var reps = [];

    // This portion does a GET request to get which user logged in
  $.get("/api/user_data").then(function(data) {
    //console.log("object 'data' inside of the first .get is ", data);
    $(".member-id").text(data.id);
    $(".member-name").text(data.email);

    //putting all of the below inside this get so as to have the correct id (user)
    // this .get brings in all the data
    $.get("/api/specific_user_data/" + data.id).then(function(data) {
      workout = [data.workoutA, data.workoutB, data.workoutC, data.workoutD, data.workoutE];
      console.log("workout array: " + workout);

      for (var i = 0; i < workout.length; i++) {
        if (workout[i] === null) {
        } else {
        $("#availableWorkouts").append("<h3 class='selectedWorkout'>" + workout[i] + "</h3>");
        }
      }
      

      exercise = [data.exerciseOneofA, data.exerciseTwoofA, data.exerciseThreeofA, 
        data.exerciseFourofA, data.exerciseFiveofA, data.exerciseSixofA, data.exerciseSevenofA, 
        data.exerciseEightofA, data.exerciseNineofA, data.exerciseTenofA,
        data.exerciseOneofB, data.exerciseTwoofB, data.exerciseThreeofB, 
        data.exerciseFourofB, data.exerciseFiveofB, data.exerciseSixofB, data.exerciseSevenofB, 
        data.exerciseEightofB, data.exerciseNineofB, data.exerciseTenofB,
        data.exerciseOneofC, data.exerciseTwoofC, data.exerciseThreeofC, 
        data.exerciseFourofC, data.exerciseFiveofC, data.exerciseSixofC, data.exerciseSevenofC, 
        data.exerciseEightofC, data.exerciseNineofC, data.exerciseTenofC,
        data.exerciseOneofD, data.exerciseTwoofD, data.exerciseThreeofD, 
        data.exerciseFourofD, data.exerciseFiveofD, data.exerciseSixofD, data.exerciseSevenofD, 
        data.exerciseEightofD, data.exerciseNineofD, data.exerciseTenofD,
        data.exerciseOneofE, data.exerciseTwoofE, data.exerciseThreeofE, 
        data.exerciseFourofE, data.exerciseFiveofE, data.exerciseSixofE, data.exerciseSevenofE, 
        data.exerciseEightofE, data.exerciseNineofE, data.exerciseTenofE];
      // etc.
      weight = [data.weightOneofA, data.weightTwoofA, data.weightThreeofA, 
        data.weightFourofA, data.weightFiveofA, data.weightSixofA, data.weightSevenofA, 
        data.weightEightofA, data.weightNineofA, data.weightTenofA,
        data.weightOneofB, data.weightTwoofB, data.weightThreeofB, 
        data.weightFourofB, data.weightFiveofB, data.weightSixofB, data.weightSevenofB, 
        data.weightEightofB, data.weightNineofB, data.weightTenofB,
        data.weightOneofC, data.weightTwoofC, data.weightThreeofC, 
        data.weightFourofC, data.weightFiveofC, data.weightSixofC, data.weightSevenofC, 
        data.weightEightofC, data.weightNineofC, data.weightTenofC,
        data.weightOneofD, data.weightTwoofD, data.weightThreeofD, 
        data.weightFourofD, data.weightFiveofD, data.weightSixofD, data.weightSevenofD, 
        data.weightEightofD, data.weightNineofD, data.weightTenofD,
        data.weightOneofE, data.weightTwoofE, data.weightThreeofE, 
        data.weightFourofE, data.weightFiveofE, data.weightSixofE, data.weightSevenofE, 
        data.weightEightofE, data.weightNineofE, data.weightTenofE];

      sets = [data.setsOneofA, data.setsTwoofA, data.setsThreeofA, 
        data.setsFourofA, data.setsFiveofA, data.setsSixofA, data.setsSevenofA, 
        data.setsEightofA, data.setsNineofA, data.setsTenofA,
        data.setsOneofB, data.setsTwoofB, data.setsThreeofB, 
        data.setsFourofB, data.setsFiveofB, data.setsSixofB, data.setsSevenofB, 
        data.setsEightofB, data.setsNineofB, data.setsTenofB,
        data.setsOneofC, data.setsTwoofC, data.setsThreeofC, 
        data.setsFourofC, data.setsFiveofC, data.setsSixofC, data.setsSevenofC, 
        data.setsEightofC, data.setsNineofC, data.setsTenofC,
        data.setsOneofD, data.setsTwoofD, data.setsThreeofD, 
        data.setsFourofD, data.setsFiveofD, data.setsSixofD, data.setsSevenofD, 
        data.setsEightofD, data.setsNineofD, data.setsTenofD,
        data.setsOneofE, data.setsTwoofE, data.setsThreeofE, 
        data.setsFourofE, data.setsFiveofE, data.setsSixofE, data.setsSevenofE, 
        data.setsEightofE, data.setsNineofE, data.setsTenofE];

      reps = [data.repsOneofA, data.repsTwoofA, data.repsThreeofA, 
        data.repsFourofA, data.repsFiveofA, data.repsSixofA, data.repsSevenofA, 
        data.repsEightofA, data.repsNineofA, data.repsTenofA,
        data.repsOneofB, data.repsTwoofB, data.repsThreeofB, 
        data.repsFourofB, data.repsFiveofB, data.repsSixofB, data.repsSevenofB, 
        data.repsEightofB, data.repsNineofB, data.repsTenofB,
        data.repsOneofC, data.repsTwoofC, data.repsThreeofC, 
        data.repsFourofC, data.repsFiveofC, data.repsSixofC, data.repsSevenofC, 
        data.repsEightofC, data.repsNineofC, data.repsTenofC,
        data.repsOneofD, data.repsTwoofD, data.repsThreeofD, 
        data.repsFourofD, data.repsFiveofD, data.repsSixofD, data.repsSevenofD, 
        data.repsEightofD, data.repsNineofD, data.repsTenofD,
        data.repsOneofE, data.repsTwoofE, data.repsThreeofE, 
        data.repsFourofE, data.repsFiveofE, data.repsSixofE, data.repsSevenofE, 
        data.repsEightofE, data.repsNineofE, data.repsTenofE];
    

          // This function happens when the user clicks the chosen workout.
      $(".selectedWorkout").on("click", function(event) {
          // What happens? Hide previous divs. Show new actual workout div.
          // Build the workout page  -  where the user sees the title of workout, the exercises,
          // the weight, and corresponding sets buttons, and reps displayed after those buttons
          // are presssed.  Also the count up clock.
        selectedWorkout = $(this).text();
        console.log("the variable selectedWorkout: " + selectedWorkout);
        
        switch (selectedWorkout) {
          case data.workoutA:
            console.log("inside case workoutA of switch");
            // this worked. so call a function that needs to be created around the code below
            // and will probably include code to rewrite DOM instead of hardcoding in members.html
            //jay is a counter, it corresponds 0-9 for A, 10-19 for B, etc.
            var jay = 0;
            createWorkout();
            break;
          case data.workoutB:
            console.log("inside case workoutB of switch");
            var jay = 10;
            createWorkout();
            break;
          default:
            console.log("not in case A or B");
        }
        // I don't think I need this line
        //$("span#workoutA").text(data.workoutA);

        function createWorkout() {
          $("span#workout").empty;
          console.log("selectedWorkout = " + selectedWorkout);
          $("span#workout").text(selectedWorkout); // but not sure what to do with exercise.length...check for null
           console.log("jay = " + jay);
          for (var j = jay; j = exercise.length; j++) {
            $("span#exercise[j]").text(exercise[j]);
            $("span#weight[j]").text(" " + weight[j] + "lb");
            // etc.

          }
        }
        // assignments for 1st exercise
        $("span#exerciseOneofA").text(data.exerciseOneofA);
        $("span#weightOneofA").text(" " + data.weightOneofA + "lb");
        $("span#setsOneofA").text(data.setsOneofA + " sets X ");
        $("span#repsOneofA").text(data.repsOneofA + " reps at ");

        // assignments for 2nd exercise
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
            //..these lines wouild be included at end of code where generic names of db variables
            // have been assigned.  They are repeated as the for loop continues.
        makeSetButtonsExOne();
        makeSetButtonsExTwo();

        function timer() {
          //this span needs to be put in a fixed footer so user sees it on page while the
          //timer clock is running. Add a stop when workout is finished? (or somewhere before?)
          //So, there is no need for a different timer span for each exercise.
          $(".footer").show();
          $("span#timerDisplay").html(startCount);
          startCount = startCount + 1;
          // set up to play a chime if startCount reaches 90, or whatever
          myTimer = setTimeout(function(){ timer() }, 1000);
        }

        function stopTimer() {
          $(".footer").hide;
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
            // by more than 1. - i don't think this does it anymore...
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

    // This click event takes place when user decides to enter a new workout.
    // Need to check if there are already other workouts, and add this with labels 
    // that denote the NEXT workout - this is inputting brand new data, not updating.
    $(document).on("click", "#enterWorkout", function() {
      $("#enterRowHeading").hide();
      $("#workoutEnterform").empty;
      console.log("workout array: "+ workout);
      //what is the earliest workout that is currently null?
      for (var i = 0; i < workout.length; i++) {
        if (workout[i] === null) {
          // workout-nameA ...  the "A" should be generic, but A=0, B=1, C=2, etc.
        } else {
        }
      }
      $("#workoutEnterForm").append("<h2>Maximum of 5 Different Workouts</h2>" +
      //this input form needs to be put in the .js so it can be rewritten as the user
      //needs more exercises and workouts. Each individual for and id should be the same
      //and in an array that will be added in in a for loop
        "<form class='enterWorkout'><fieldset><legend>Enter Workout</legend>" +
        "<div class='form-group'><label for='workout-nameA'>Name of Workout</label>" +
        "<input type='text' class='form-control' id='workout-nameA' placeholder=''></div>" +
        // above is the workout name, below if an exercise name, weight, sets, reps
        "<div class='form-group'><label for='exercise-OneA'>Name of First Exercise</label>" +
        "<input type='text' class='form-control' id='exercise-OneA' placeholder=''></div>" +
        "<div class='form-group'><label for='exercise-OneA-weight'>Weight</label>" +
        "<input type='number' class='form-control' id='exercise-OneA-weight' placeholder='pounds'></div>" +
        "<div class='form-group'><label for='exercise-OneA-sets'>Number of Sets</label>" +
        "<input type='number' class='form-control' id='exercise-OneA-sets' placeholder=''></div>" +
        "<div class='form-group'><label for='exercise-OneA-reps'>Number of Reps</label>" +
        "<input type='number' class='form-control' id='exercise-OneA-reps' placeholder=''></div>" +
        "<button type='submit' class='btn btn-default'>Submit</button></fieldset></form>");
    });

    // When the submit button for building a workout is clicked,
    $("form.enterWorkout").on("submit", function(event) {
      event.preventDefault();
      // build the data object to be put into the database
      // but it only works if there is data, so need to only put in the values
      // that have data
      var workoutAInputs = {
        workoutA: $("input#workout-nameA").val().trim(),
        exerciseOneofA: $("input#exercise-OneA").val().trim(),
        weightOneofA:$("input#exercise-OneA-weight").val().trim(),
        setsOneofA: $("input#exercise-OneA-sets").val().trim(),
        repsOneofA: $("input#exercise-OneA-reps").val().trim()
        // exerciseTwoofA: $("input#exercise-TwoA").val().trim(),
        // weightTwoofA:$("input#exercise-TwoA-weight").val().trim(),
        // setsTwoofA: $("input#exercise-TwoA-sets").val().trim(),
        // repsTwoofA: $("input#exercise-TwoA-reps").val().trim()
      };
      console.log("workoutAInputs: " + workoutAInputs);
      
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