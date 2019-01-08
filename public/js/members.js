$(document).ready(function() {
  console.log("Hello World!");
    //start with the footer showing the timer hidden. It appears when the timer is counting
   $("#currentWorkout").hide();
   $(".footer").hide();
  //
  //$("#enterRowHeading").hide();
  // set up the variables
  var startCount = 0;
  var myTimer;
  var clicksofSetButton = -1;
  var indexofPreviousButton = 20;
  var previousExercise = "nothing";
  var selectedWorkout;
  // in progress: not sure what arrays I need:
  var workout = [];
  var exercise = [];
  var weight = [];
  var sets = [];
  var reps = [];
  var jay; //indeces of workouts array
  // indeces for exercise/weight/sets/reps arrays corresponding to
  var kay; //  j=0: kay=0-9; j=1:kay=10-19; j=2:kay=20-29; etc.
  // e is the count of exercises within each workout
  var e;
  var numWorkouts; // numWorkouts is count of workouts for listing purposes
  // build arrays for input of new data
  var workoutInput = ["workoutA", "workoutB", "workoutC", "workoutD", "workoutE"];

  var exerciseInput = ["exerciseOneofA", "exerciseTwoofA","exerciseThreeofA", "exerciseFourofA", "exerciseFiveofA",
   "exerciseSixofA", "exerciseSevenofA", "exerciseEightofA", "exerciseNineofA", "exerciseTenofA",
   "exerciseOneofB", "exerciseTwoofB","exerciseThreeofB", "exerciseFourofB", "exerciseFiveofB",
   "exerciseSixofB", "exerciseSevenofB", "exerciseEightofB", "exerciseNineofB", "exerciseTenofB",
   "exerciseOneofC", "exerciseTwoofC","exerciseThreeofC", "exerciseFourofC", "exerciseFiveofC",
   "exerciseSixofC", "exerciseSevenofC", "exerciseEightofC", "exerciseNineofC", "exerciseTenofC",
   "exerciseOneofD", "exerciseTwoofD","exerciseThreeofD", "exerciseFourofD", "exerciseFiveofD",
   "exerciseSixofD", "exerciseSevenofD", "exerciseEightofD", "exerciseNineofD", "exerciseTenofD",
   "exerciseOneofE", "exerciseTwoofE","exerciseThreeofE", "exerciseFourofE", "exerciseFiveofE",
   "exerciseSixofE", "exerciseSevenofE", "exerciseEightofE", "exerciseNineofE", "exerciseTenofE"];

  var weightInput = ["weightOneofA", "weightTwoofA","weightThreeofA", "weightFourofA", "weightFiveofA",
   "weightSixofA", "weightSevenofA", "weightEightofA", "weightNineofA", "weightTenofA",
   "weightOneofB", "weightTwoofB","weightThreeofB", "weightFourofB", "weightFiveofB",
   "weightSixofB", "weightSevenofB", "weightEightofB", "weightNineofB", "weightTenofB",
   "weightOneofC", "weightTwoofC","weightThreeofC", "weightFourofC", "weightFiveofC",
   "weightSixofC", "weightSevenofC", "weightEightofC", "weightNineofC", "weightTenofC",
   "weightOneofD", "weightTwoofD","weightThreeofD", "weightFourofD", "weightFiveofD",
   "weightSixofD", "weightSevenofD", "weightEightofD", "weightNineofD", "weightTenofD",
   "weightOneofE", "weightTwoofE","weightThreeofE", "weightFourofE", "weightFiveofE",
   "weightSixofE", "weightSevenofE", "weightEightofE", "weightNineofE", "weightTenofE"];

  var setsInput = ["setsOneofA", "setsTwoofA","setsThreeofA", "setsFourofA", "setsFiveofA",
   "setsSixofA", "setsSevenofA", "setsEightofA", "setsNineofA", "setsTenofA",
   "setsOneofB", "setsTwoofB","setsThreeofB", "setsFourofB", "setsFiveofB",
   "setsSixofB", "setsSevenofB", "setsEightofB", "setsNineofB", "setsTenofB",
   "setsOneofC", "setsTwoofC","setsThreeofC", "setsFourofC", "setsFiveofC",
   "setsSixofC", "setsSevenofC", "setsEightofC", "setsNineofC", "setsTenofC",
   "setsOneofD", "setsTwoofD","setsThreeofD", "setsFourofD", "setsFiveofD",
   "setsSixofD", "setsSevenofD", "setsEightofD", "setsNineofD", "setsTenofD",
   "setsOneofE", "setsTwoofE","setsThreeofE", "setsFourofE", "setsFiveofE",
   "setsSixofE", "setsSevenofE", "setsEightofE", "setsNineofE", "setsTenofE"];

   var repsInput = ["repsOneofA", "repsTwoofA","repsThreeofA", "repsFourofA", "repsFiveofA",
   "repsSixofA", "repsSevenofA", "repsEightofA", "repsNineofA", "repsTenofA",
   "repsOneofB", "repsTwoofB","repsThreeofB", "repsFourofB", "repsFiveofB",
   "repsSixofB", "repsSevenofB", "repsEightofB", "repsNineofB", "repsTenofB",
   "repsOneofC", "repsTwoofC","repsThreeofC", "repsFourofC", "repsFiveofC",
   "repsSixofC", "repsSevenofC", "repsEightofC", "repsNineofC", "repsTenofC",
   "repsOneofD", "repsTwoofD","repsThreeofD", "repsFourofD", "repsFiveofD",
   "repsSixofD", "repsSevenofD", "repsEightofD", "repsNineofD", "repsTenofD",
   "repsOneofE", "repsTwoofE","repsThreeofE", "repsFourofE", "repsFiveofE",
   "repsSixofE", "repsSevenofE", "repsEightofE", "repsNineofE", "repsTenofE"];

    // This portion does a GET request to get which user logged in
  $.get("/api/user_data").then(function(userdata) {
    console.log("object 'userdata' inside of the first .get is ", userdata);
    $(".member-id").text(userdata.id);
    $(".member-name").text(userdata.email);

    // this function creates the delete user button in the navbar with the data of the user's id
    var holder = $("<button>");
    // not sure if I should use .data or .attr - study later
    holder.data("userId", userdata.id);
    holder.addClass("deleteUser");
    holder.text("Delete User");
    $(".navbar-header").append(holder);

    // This function deletes an entire user.
    // need to log out user after they click the delete user button, and direct back to home page.
    $(document).on("click", ".deleteUser", function(event) {
      event.preventDefault();
      // copied from class example
      var id = $(this).data("userId");
      console.log("id: " + id);
      // ADD a warning alert that the current user and ALL THE DATA will be deleted
      $.ajax({
        method: "DELETE",
        url: "/api/deleteUser/" + id
      }).then(
        function(getDeletedUsers) {
          if (getDeletedUsers === 1) {
            console.log("User has been deleted, deletedUsers: ", getDeletedUsers);
            // redirects to the /logout page so the logout api .get is called.
            // so, the user deletes himself, and the page reloads at the sign up page, "/"
            window.location.href = "/logout";
          }
        }, {
            function(err) {
              console.log(err);
            }
          }
      )
    });
      //putting all of the below inside the first get so as to have the correct id (user)
    // this .get brings in all the data from the db
    $.get("/api/specific_user_data/" + userdata.id).then(function(data) {
      // build array of named workouts - new for each data retrieval
      workout = [data.workoutA, data.workoutB, data.workoutC, data.workoutD, data.workoutE];
      console.log("workout array: " + workout);
      //this merely creates a list of workouts available, but the class "selectedWorkout" is assigned
     
      $("#availableWorkouts").empty();
      numWorkouts = 0;
      for (i = 0; i < workout.length; i++) {
        if (workout[i] === null || workout[i] === "") {
        } else {
        // need to create the Edit functon.  The Edit button should have the same as the delete button
        var holder2 = $("<button>");
        holder2.attr("index", i);
        holder2.addClass("editWorkout");
        holder2.text("Edit");
        var holder = $("<button>");
        holder.attr("index", i);
        holder.addClass("renameWorkoutNull");
        holder.text("Delete");
        $("#availableWorkouts").append("<h3 class='selectedWorkout'>" + workout[i] + "</h3>");
        $("#availableWorkouts").append(holder2);
        $("#availableWorkouts").append(holder);
        // the Edit workout button will show all the exercises, START HERE!
        // but the placeholder will show what is currently in the existing exercise.
        // as the user submits the changes the data, then the new data is submitted to the database.

        // This is where the number of workouts for that user is counted. Available throughout.
        numWorkouts++;
        console.log("inside first .get of info: numWorkouts = " + numWorkouts);
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
        console.log("exercise array: " + exercise);

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
        console.log("weights array: " + weight);
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
        console.log("sets array: " + sets);
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
        console.log("reps array: " + reps);

      // function to edit the workout. 
      $(document).on("click", ".editWorkout", function(event) {
        event.preventDefault();
        console.log("inside the new editWorkout function!");
        // what do I know: the index of the workout i, which is jay
        // and the exercise, weight, sets, reps arrays are all built.
      });

      // function to delete a workout - 1st method, renames the name of the workout to null
      // A User sees
      // only the list of available workouts, and new ones are put in any space
      // that is currently null. New exercises will be written over any current info.
      $(document).on("click", ".renameWorkoutNull", function(event) {
        event.preventDefault();
        var indexWorkout = parseInt($(this).attr("index"));
        console.log("inside function to rename workout data to null, index: " + indexWorkout);
        switch (indexWorkout) {
          case 0:
            var workoutNameInputs = {
              // Big problem: the workout and exercises can be null, but the others 
              // have to be integers, as they are defined as that in the user.js file!
              //i've got to figure out how to return that cell back to null, not "", or "null"
              // for now, I've set them to 0 (zero).
              workoutA: null,
              exerciseOneofA: null,
              exerciseTwoofA: null,
              exerciseThreeofA: null,
              exerciseFourofA: null,
              exerciseFiveofA: null,
              exerciseSixofA: null,
              exerciseSevenofA: null,
              exerciseEightofA: null,
              exerciseNineofA: null,
              exerciseTenofA: null,
              weightOneofA: 0,
              weightTwoofA: 0,
              weightThreeofA: 0,
              weightFourofA: 0,
              weightFiveofA: 0,
              weightSixofA: 0,
              weightSevenofA: 0,
              weightEightofA: 0,
              weightNineofA: 0,
              weightTenofA: 0,
              setsOneofA: 0,
              setsTwoofA: 0,
              setsThreeofA: 0,
              setsFourofA: 0,
              setsFiveofA: 0,
              setsSixofA: 0,
              setsSevenofA: 0,
              setsEightofA: 0,
              setsNineofA: 0,
              setsTenofA: 0,
              repsOneofA: 0,
              repsTwoofA: 0,
              repsThreeofA: 0,
              repsFourofA: 0,
              repsFiveofA: 0,
              repsSixofA: 0,
              repsSevenofA: 0,
              repsEightofA: 0,
              repsNineofA: 0,
              repsTenofA: 0
            };
            break;
          case 1:
            var workoutNameInputs = {
              workoutB: null,
              exerciseOneofB: null,
              exerciseTwoofB: null,
              exerciseThreeofB: null,
              exerciseFourofB: null,
              exerciseFiveofB: null,
              exerciseSixofB: null,
              exerciseSevenofB: null,
              exerciseEightofB: null,
              exerciseNineofB: null,
              exerciseTenofB: null,
              weightOneofB: 0,
              weightTwoofB: 0,
              weightThreeofB: 0,
              weightFourofB: 0,
              weightFiveofB: 0,
              weightSixofB: 0,
              weightSevenofB: 0,
              weightEightofB: 0,
              weightNineofB: 0,
              weightTenofB: 0,
              setsOneofB: 0,
              setsTwoofB: 0,
              setsThreeofB: 0,
              setsFourofB: 0,
              setsFiveofB: 0,
              setsSixofB: 0,
              setsSevenofB: 0,
              setsEightofB: 0,
              setsNineofB: 0,
              setsTenofB: 0,
              repsOneofB: 0,
              repsTwoofB: 0,
              repsThreeofB: 0,
              repsFourofB: 0,
              repsFiveofB: 0,
              repsSixofB: 0,
              repsSevenofB: 0,
              repsEightofB: 0,
              repsNineofB: 0,
              repsTenofB: 0
            };
            break;
          case 2:
            var workoutNameInputs = {
              workoutC: null,
              exerciseOneofC: null,
              exerciseTwoofC: null,
              exerciseThreeofC: null,
              exerciseFourofC: null,
              exerciseFiveofC: null,
              exerciseSixofC: null,
              exerciseSevenofC: null,
              exerciseEightofC: null,
              exerciseNineofC: null,
              exerciseTenofC: null,
              weightOneofC: 0,
              weightTwoofC: 0,
              weightThreeofC: 0,
              weightFourofC: 0,
              weightFiveofC: 0,
              weightSixofC: 0,
              weightSevenofC: 0,
              weightEightofC: 0,
              weightNineofC: 0,
              weightTenofC: 0,
              setsOneofC: 0,
              setsTwoofC: 0,
              setsThreeofC: 0,
              setsFourofC: 0,
              setsFiveofC: 0,
              setsSixofC: 0,
              setsSevenofC: 0,
              setsEightofC: 0,
              setsNineofC: 0,
              setsTenofC: 0,
              repsOneofC: 0,
              repsTwoofC: 0,
              repsThreeofC: 0,
              repsFourofC: 0,
              repsFiveofC: 0,
              repsSixofC: 0,
              repsSevenofC: 0,
              repsEightofC: 0,
              repsNineofC: 0,
              repsTenofC: 0
            };
            break;
          case 3:
            var workoutNameInputs = {
              workoutD: null,
              exerciseOneofD: null,
              exerciseTwoofD: null,
              exerciseThreeofD: null,
              exerciseFourofD: null,
              exerciseFiveofD: null,
              exerciseSixofD: null,
              exerciseSevenofD: null,
              exerciseEightofD: null,
              exerciseNineofD: null,
              exerciseTenofD: null,
              weightOneofD: 0,
              weightTwoofD: 0,
              weightThreeofD: 0,
              weightFourofD: 0,
              weightFiveofD: 0,
              weightSixofD: 0,
              weightSevenofD: 0,
              weightEightofD: 0,
              weightNineofD: 0,
              weightTenofD: 0,
              setsOneofD: 0,
              setsTwoofD: 0,
              setsThreeofD: 0,
              setsFourofD: 0,
              setsFiveofD: 0,
              setsSixofD: 0,
              setsSevenofD: 0,
              setsEightofD: 0,
              setsNineofD: 0,
              setsTenofD: 0,
              repsOneofD: 0,
              repsTwoofD: 0,
              repsThreeofD: 0,
              repsFourofD: 0,
              repsFiveofD: 0,
              repsSixofD: 0,
              repsSevenofD: 0,
              repsEightofD: 0,
              repsNineofD: 0,
              repsTenofD: 0
            };
            break;
          case 4:
            var workoutNameInputs = {
              workoutE: null,
              exerciseOneofE: null,
              exerciseTwoofE: null,
              exerciseThreeofE: null,
              exerciseFourofE: null,
              exerciseFiveofE: null,
              exerciseSixofE: null,
              exerciseSevenofE: null,
              exerciseEightofE: null,
              exerciseNineofE: null,
              exerciseTenofE: null,
              weightOneofE: 0,
              weightTwoofE: 0,
              weightThreeofE: 0,
              weightFourofE: 0,
              weightFiveofE: 0,
              weightSixofE: 0,
              weightSevenofE: 0,
              weightEightofE: 0,
              weightNineofE: 0,
              weightTenofE: 0,
              setsOneofE: 0,
              setsTwoofE: 0,
              setsThreeofE: 0,
              setsFourofE: 0,
              setsFiveofE: 0,
              setsSixofE: 0,
              setsSevenofE: 0,
              setsEightofE: 0,
              setsNineofE: 0,
              setsTenofE: 0,
              repsOneofE: 0,
              repsTwoofE: 0,
              repsThreeofE: 0,
              repsFourofE: 0,
              repsFiveofE: 0,
              repsSixofE: 0,
              repsSevenofE: 0,
              repsEightofE: 0,
              repsNineofE: 0,
              repsTenofE: 0
            };
            break;
          default:
            console.log("default in switch case code of assigning a name to a workout, something wrong");
        }
        var currentURL = window.location.origin;
        $.ajax(currentURL + "/api/createWorkout/" + userdata.id, {
          type: "PUT",
          data: workoutNameInputs
        }).then(
          function() {
            console.log("The workout name has been made null");
          }
        );
        // this reloads the page to show the user deleted the workout, and remakes the data arrays.
        window.location.reload();
      });

      // These functions build the entry form when the user wants to enter new data,
      // Update or edit an existing workout still needs to be added.
      // Need to check where there is a "null", and put the new workout there.
      $(document).on("click", "#enterWorkout", function() {
        console.log("Inside onclick function to build the form to enter a workout name-is this working?");
        $("#entryForm").empty();
        //test for next open workout by checking if workout[i] is null
        for (jay = 0; jay < workout.length; jay++) {
          console.log("jay = " + jay + ",   workout[jay] = " + workout[jay]);
          if (workout[jay] === null || workout[jay] === "") {
            console.log("inside function to build form to name workouts, 1st if, numWorkouts = " + numWorkouts);
            // be open to putting this in it's own function to be called from here, for editing workout names later...
            //HERE: I think i'm counting kay wrong, if jay is 0, kay should be 0-9
            $("#entryForm").append("<h2>Enter Name of New Workout</h2>" +
              "<form class='enterWorkoutName'>" +
              "<div class='form-group'><label for=" + workoutInput[jay] + ">Name of New Workout</label>" +
              "<input type='text' class='form-control' id=" + workoutInput[jay] + " placeholder='enter new name'></div>" +
              "<button type='submit' class='btn btn-default' id='nameSubButton'>Submit</button></form>");
              console.log("jay inside creation of workout name form = " + jay);
              return;
            } else if (numWorkouts === 5) {
              console.log("inside function to build form to name workouts, 2nd if, numWorkouts = " + numWorkouts);
              console.log("this needs to be displayed to user, but .... already have 5 workouts!");
              return;
            }
        }
      });
      // when the submit button for inputing or changing the name of a workout is clicked,
      // the data is stored in the db
      $(document).on("click", "#nameSubButton", function(event) {
        event.preventDefault();
        // build the data object to be put into the database
        // but it only works if there is data, so need to only put in the values that have data
        //put the switchcase code here. 
        // The varible kay (the index for the arrays) is stair stepped by 10 
        // because there are a maximum of 10 exercises for each workout
        switch (jay) {
          case 0:
            var workoutNameInputs = {
              workoutA: $("#" + workoutInput[jay]).val().trim()
            };
            kay = 0;
            break;
          case 1:
            var workoutNameInputs = {
              workoutB: $("#" + workoutInput[jay]).val().trim()
            };
            kay = 10;
            break;
          case 2:
            var workoutNameInputs = {
              workoutC: $("#" + workoutInput[jay]).val().trim()
            };
            kay = 20;
            break;
          case 3:
            var workoutNameInputs = {
              workoutD: $("#" + workoutInput[jay]).val().trim()
            };
            kay = 30;
            break;
          case 4:
            var workoutNameInputs = {
              workoutE: $("#" + workoutInput[jay]).val().trim()
            };
            kay = 40;
            break;
          default:
            console.log("default in switch case code of assigning a name to a workout, something wrong");
        }
        var currentURL = window.location.origin;
        $.ajax(currentURL + "/api/createWorkout/" + userdata.id, {
          type: "PUT",
          data: workoutNameInputs
        }).then(
          function() {
            console.log("a new workout name is stored, jay = " + jay + ". kay = " + kay + ".");
          }
        );
        // If there's an error, handle it by throwing up a boostrap alert.
        // empty out the input fields for the form
        $("#" + workoutInput[jay]).val("");
        // take away the entry form for naming a new workout
        $("#entryForm").empty();
        // Now call the function that builds the input form for exercises.
        // what are the variables I know before this is called?:
        // jay (which is the number of the workout: 0-4)
        // need to set kay, (which is the index of the exercise/weight/sets/reps array), 
        // and increase it as needed for more exercises
        // then just need to put in the apprpriate variable: exercise, weight, sets, reps
        // and add buttons to either add more exercises, or a button to finish at the end
        // but each exercise needs to have a button to edit that exercise info... - maybe 
        // only when the whole exercise is listed out...???
        // the variable, e - the count of the exercise is set to 1 here because the user
        // had just created the new workout.
        e = 1;
        enterExercises();
      });

      // this function creates the form for inputting exercises
      function enterExercises() {
        $("#exerciseEntryForm").empty();
        console.log("Inside creating of exercise form functin: kay = " + kay + ",   e = " + e);
        
        $("#exerciseEntryForm").append("<h2>Enter exercise " + e + " of workout</h2>" +
          "<form class='enterWorkoutExercises'><fieldset><legend>Enter Exercise " + e + " in  Workout</legend>" +
          "<div class='form-group'><label for=" + exerciseInput[kay] + ">Name of Exercise</label>" +
          "<input type='text' class='form-control' id=" + exerciseInput[kay] + " placeholder=''></div>" +
          "<div class='form-group'><label for=" + weightInput[kay] + ">Weight</label>" +
          "<input type='number' class='form-control' id=" + weightInput[kay] + " placeholder='pounds'></div>" +
          "<div class='form-group'><label for=" + setsInput[kay] + ">Number of Sets</label>" +
          "<input type='number' class='form-control' id=" + setsInput[kay] + " placeholder=''></div>" +
          "<div class='form-group'><label for=" + repsInput[kay] + ">Number of Reps</label>" +
          "<input type='number' class='form-control' id=" + repsInput[kay] + " placeholder=''></div>" +
          "<button type='submit' class='btn btn-default' id='exSubButton'>Submit</button></fieldset></form>");
      }
      
      // When the submit button for building the exercises of a workout is clicked,
      $(document).on("click", "#exSubButton", function(event) {
        event.preventDefault();
        // build the data object to be put into the database
        
        exerciseSwitchPut();
            //window.location.reload(true);
            // If there's an error, handle it by throwing up a boostrap alert
        // ...and empty out the input fields for the form
          $("#" + exerciseInput[kay]).val("");
          $("#" + weightInput[kay]).val("");
          $("#" + setsInput[kay]).val("");
          $("#" + repsInput[kay]).val("");
          //  
          // Load button in section to ask the user if they want another exercise here
          // If clicked, increase kay by 1, go back to function enterExercises().
          $("#exerciseEntryForm").empty();
          if (e === 10) {
            console.log("user has exceeded 10 exercises!"); // needs to be put in modal to alert user
            $("#exerciseEntryForm").append("<h2>User has 10 exercises</h2><button id='noMoreExercises'>Finish</button>");
          } else {
            $("#exerciseEntryForm").append("<button id='moreExercises'>Add More Exercises</button>" +
            "<button id='noMoreExercises'>Finish</button>");
          }
      });

      // This function contains the switch function to determine which of the data arrays
      // are to be updated into the db.
      function exerciseSwitchPut() {
        switch (kay) {
          case 0:
            var workoutExerciseInputs = {
              exerciseOneofA: $("#" + exerciseInput[kay]).val().trim(),
              weightOneofA:$("#" + weightInput[kay]).val().trim(),
              setsOneofA: $("#" + setsInput[kay]).val().trim(),
              repsOneofA: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 1:
            var workoutExerciseInputs = {
              exerciseTwoofA: $("#" + exerciseInput[kay]).val().trim(),
              weightTwoofA:$("#" + weightInput[kay]).val().trim(),
              setsTwoofA: $("#" + setsInput[kay]).val().trim(),
              repsTwoofA: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 2:
            var workoutExerciseInputs = {
              exerciseThreeofA: $("#" + exerciseInput[kay]).val().trim(),
              weightThreeofA:$("#" + weightInput[kay]).val().trim(),
              setsThreeofA: $("#" + setsInput[kay]).val().trim(),
              repsThreeofA: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 3:
            var workoutExerciseInputs = {
              exerciseFourofA: $("#" + exerciseInput[kay]).val().trim(),
              weightFourofA:$("#" + weightInput[kay]).val().trim(),
              setsFourofA: $("#" + setsInput[kay]).val().trim(),
              repsFourofA: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 4:
            var workoutExerciseInputs = {
              exerciseFiveofA: $("#" + exerciseInput[kay]).val().trim(),
              weightFiveofA:$("#" + weightInput[kay]).val().trim(),
              setsFiveofA: $("#" + setsInput[kay]).val().trim(),
              repsFiveofA: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 5:
            var workoutExerciseInputs = {
              exerciseSixofA: $("#" + exerciseInput[kay]).val().trim(),
              weightSixofA:$("#" + weightInput[kay]).val().trim(),
              setsSixofA: $("#" + setsInput[kay]).val().trim(),
              repsSixofA: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 6:
            var workoutExerciseInputs = {
              exerciseSevenofA: $("#" + exerciseInput[kay]).val().trim(),
              weightSevenofA:$("#" + weightInput[kay]).val().trim(),
              setsSevenofA: $("#" + setsInput[kay]).val().trim(),
              repsSevenofA: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 7:
            var workoutExerciseInputs = {
              exerciseEightofA: $("#" + exerciseInput[kay]).val().trim(),
              weightEightofA:$("#" + weightInput[kay]).val().trim(),
              setsEightofA: $("#" + setsInput[kay]).val().trim(),
              repsEightofA: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 8:
            var workoutExerciseInputs = {
              exerciseNineofA: $("#" + exerciseInput[kay]).val().trim(),
              weightNineofA:$("#" + weightInput[kay]).val().trim(),
              setsNineofA: $("#" + setsInput[kay]).val().trim(),
              repsNineofA: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 9:
            var workoutExerciseInputs = {
              exerciseTenofA: $("#" + exerciseInput[kay]).val().trim(),
              weightTenofA:$("#" + weightInput[kay]).val().trim(),
              setsTenofA: $("#" + setsInput[kay]).val().trim(),
              repsTenofA: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 10:
            var workoutExerciseInputs = {
              exerciseOneofB: $("#" + exerciseInput[kay]).val().trim(),
              weightOneofB:$("#" + weightInput[kay]).val().trim(),
              setsOneofB: $("#" + setsInput[kay]).val().trim(),
              repsOneofB: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 11:
            var workoutExerciseInputs = {
              exerciseTwoofB: $("#" + exerciseInput[kay]).val().trim(),
              weightTwoofB:$("#" + weightInput[kay]).val().trim(),
              setsTwoofB: $("#" + setsInput[kay]).val().trim(),
              repsTwoofB: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 12:
            var workoutExerciseInputs = {
              exerciseThreeofB: $("#" + exerciseInput[kay]).val().trim(),
              weightThreeofB:$("#" + weightInput[kay]).val().trim(),
              setsThreeofB: $("#" + setsInput[kay]).val().trim(),
              repsThreeofB: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 13:
            var workoutExerciseInputs = {
              exerciseFourofB: $("#" + exerciseInput[kay]).val().trim(),
              weightFourofB:$("#" + weightInput[kay]).val().trim(),
              setsFourofB: $("#" + setsInput[kay]).val().trim(),
              repsFourofB: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 14:
            var workoutExerciseInputs = {
              exerciseFiveofB: $("#" + exerciseInput[kay]).val().trim(),
              weightFiveofB:$("#" + weightInput[kay]).val().trim(),
              setsFiveofB: $("#" + setsInput[kay]).val().trim(),
              repsFiveofB: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 15:
            var workoutExerciseInputs = {
              exerciseSixofB: $("#" + exerciseInput[kay]).val().trim(),
              weightSixofB:$("#" + weightInput[kay]).val().trim(),
              setsSixofB: $("#" + setsInput[kay]).val().trim(),
              repsSixofB: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 16:
            var workoutExerciseInputs = {
              exerciseSevenofB: $("#" + exerciseInput[kay]).val().trim(),
              weightSevenofB:$("#" + weightInput[kay]).val().trim(),
              setsSevenofB: $("#" + setsInput[kay]).val().trim(),
              repsSevenofB: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 17:
            var workoutExerciseInputs = {
              exerciseEightofB: $("#" + exerciseInput[kay]).val().trim(),
              weightEightofB:$("#" + weightInput[kay]).val().trim(),
              setsEightofB: $("#" + setsInput[kay]).val().trim(),
              repsEightofB: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 18:
            var workoutExerciseInputs = {
              exerciseNineofB: $("#" + exerciseInput[kay]).val().trim(),
              weightNineofB:$("#" + weightInput[kay]).val().trim(),
              setsNineofB: $("#" + setsInput[kay]).val().trim(),
              repsNineofB: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 19:
            var workoutExerciseInputs = {
              exerciseTenofB: $("#" + exerciseInput[kay]).val().trim(),
              weightTenofB:$("#" + weightInput[kay]).val().trim(),
              setsTenofB: $("#" + setsInput[kay]).val().trim(),
              repsTenofB: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 20:
            var workoutExerciseInputs = {
              exerciseOneofC: $("#" + exerciseInput[kay]).val().trim(),
              weightOneofC:$("#" + weightInput[kay]).val().trim(),
              setsOneofC: $("#" + setsInput[kay]).val().trim(),
              repsOneofC: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 21:
            var workoutExerciseInputs = {
              exerciseTwoofC: $("#" + exerciseInput[kay]).val().trim(),
              weightTwoofC:$("#" + weightInput[kay]).val().trim(),
              setsTwoofC: $("#" + setsInput[kay]).val().trim(),
              repsTwoofC: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 22:
            var workoutExerciseInputs = {
              exerciseThreeofC: $("#" + exerciseInput[kay]).val().trim(),
              weightThreeofC:$("#" + weightInput[kay]).val().trim(),
              setsThreeofC: $("#" + setsInput[kay]).val().trim(),
              repsThreeofC: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 23:
            var workoutExerciseInputs = {
              exerciseFourofC: $("#" + exerciseInput[kay]).val().trim(),
              weightFourofC:$("#" + weightInput[kay]).val().trim(),
              setsFourofC: $("#" + setsInput[kay]).val().trim(),
              repsFourofC: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 24:
            var workoutExerciseInputs = {
              exerciseFiveofC: $("#" + exerciseInput[kay]).val().trim(),
              weightFiveofC:$("#" + weightInput[kay]).val().trim(),
              setsFiveofC: $("#" + setsInput[kay]).val().trim(),
              repsFiveofC: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 25:
            var workoutExerciseInputs = {
              exerciseSixofC: $("#" + exerciseInput[kay]).val().trim(),
              weightSixofC:$("#" + weightInput[kay]).val().trim(),
              setsSixofC: $("#" + setsInput[kay]).val().trim(),
              repsSixofC: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 26:
            var workoutExerciseInputs = {
              exerciseSevenofC: $("#" + exerciseInput[kay]).val().trim(),
              weightSevenofC:$("#" + weightInput[kay]).val().trim(),
              setsSevenofC: $("#" + setsInput[kay]).val().trim(),
              repsSevenofC: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 27:
            var workoutExerciseInputs = {
              exerciseEightofC: $("#" + exerciseInput[kay]).val().trim(),
              weightEightofC:$("#" + weightInput[kay]).val().trim(),
              setsEightofC: $("#" + setsInput[kay]).val().trim(),
              repsEightofC: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 28:
            var workoutExerciseInputs = {
              exerciseNineofC: $("#" + exerciseInput[kay]).val().trim(),
              weightNineofC:$("#" + weightInput[kay]).val().trim(),
              setsNineofC: $("#" + setsInput[kay]).val().trim(),
              repsNineofC: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 29:
            var workoutExerciseInputs = {
              exerciseTenofC: $("#" + exerciseInput[kay]).val().trim(),
              weightTenofC:$("#" + weightInput[kay]).val().trim(),
              setsTenofC: $("#" + setsInput[kay]).val().trim(),
              repsTenofC: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 30:
            var workoutExerciseInputs = {
              exerciseOneofD: $("#" + exerciseInput[kay]).val().trim(),
              weightOneofD:$("#" + weightInput[kay]).val().trim(),
              setsOneofD: $("#" + setsInput[kay]).val().trim(),
              repsOneofD: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 31:
            var workoutExerciseInputs = {
              exerciseTwoofD: $("#" + exerciseInput[kay]).val().trim(),
              weightTwoofD:$("#" + weightInput[kay]).val().trim(),
              setsTwoofD: $("#" + setsInput[kay]).val().trim(),
              repsTwoofD: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 32:
            var workoutExerciseInputs = {
              exerciseThreeofD: $("#" + exerciseInput[kay]).val().trim(),
              weightThreeofD:$("#" + weightInput[kay]).val().trim(),
              setsThreeofD: $("#" + setsInput[kay]).val().trim(),
              repsThreeofD: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 33:
            var workoutExerciseInputs = {
              exerciseFourofD: $("#" + exerciseInput[kay]).val().trim(),
              weightFourofD:$("#" + weightInput[kay]).val().trim(),
              setsFourofD: $("#" + setsInput[kay]).val().trim(),
              repsFourofD: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 34:
            var workoutExerciseInputs = {
              exerciseFiveofD: $("#" + exerciseInput[kay]).val().trim(),
              weightFiveofD:$("#" + weightInput[kay]).val().trim(),
              setsFiveofD: $("#" + setsInput[kay]).val().trim(),
              repsFiveofD: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 35:
            var workoutExerciseInputs = {
              exerciseSixofD: $("#" + exerciseInput[kay]).val().trim(),
              weightSixofD:$("#" + weightInput[kay]).val().trim(),
              setsSixofD: $("#" + setsInput[kay]).val().trim(),
              repsSixofD: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 36:
            var workoutExerciseInputs = {
              exerciseSevenofD: $("#" + exerciseInput[kay]).val().trim(),
              weightSevenofD:$("#" + weightInput[kay]).val().trim(),
              setsSevenofD: $("#" + setsInput[kay]).val().trim(),
              repsSevenofD: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 37:
            var workoutExerciseInputs = {
              exerciseEightofD: $("#" + exerciseInput[kay]).val().trim(),
              weightEightofD:$("#" + weightInput[kay]).val().trim(),
              setsEightofD: $("#" + setsInput[kay]).val().trim(),
              repsEightofD: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 38:
            var workoutExerciseInputs = {
              exerciseNineofD: $("#" + exerciseInput[kay]).val().trim(),
              weightNineofD:$("#" + weightInput[kay]).val().trim(),
              setsNineofD: $("#" + setsInput[kay]).val().trim(),
              repsNineofD: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 39:
            var workoutExerciseInputs = {
              exerciseTenofD: $("#" + exerciseInput[kay]).val().trim(),
              weightTenofD:$("#" + weightInput[kay]).val().trim(),
              setsTenofD: $("#" + setsInput[kay]).val().trim(),
              repsTenofD: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 40:
            var workoutExerciseInputs = {
              exerciseOneofE: $("#" + exerciseInput[kay]).val().trim(),
              weightOneofE:$("#" + weightInput[kay]).val().trim(),
              setsOneofE: $("#" + setsInput[kay]).val().trim(),
              repsOneofE: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 41:
            var workoutExerciseInputs = {
              exerciseTwoofE: $("#" + exerciseInput[kay]).val().trim(),
              weightTwoofE:$("#" + weightInput[kay]).val().trim(),
              setsTwoofE: $("#" + setsInput[kay]).val().trim(),
              repsTwoofE: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 42:
            var workoutExerciseInputs = {
              exerciseThreeofE: $("#" + exerciseInput[kay]).val().trim(),
              weightThreeofE:$("#" + weightInput[kay]).val().trim(),
              setsThreeofE: $("#" + setsInput[kay]).val().trim(),
              repsThreeofE: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 43:
            var workoutExerciseInputs = {
              exerciseFourofE: $("#" + exerciseInput[kay]).val().trim(),
              weightFourofE:$("#" + weightInput[kay]).val().trim(),
              setsFourofE: $("#" + setsInput[kay]).val().trim(),
              repsFourofE: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 44:
            var workoutExerciseInputs = {
              exerciseFiveofE: $("#" + exerciseInput[kay]).val().trim(),
              weightFiveofE:$("#" + weightInput[kay]).val().trim(),
              setsFiveofE: $("#" + setsInput[kay]).val().trim(),
              repsFiveofE: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 45:
            var workoutExerciseInputs = {
              exerciseSixofE: $("#" + exerciseInput[kay]).val().trim(),
              weightSixofE:$("#" + weightInput[kay]).val().trim(),
              setsSixofE: $("#" + setsInput[kay]).val().trim(),
              repsSixofE: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 46:
            var workoutExerciseInputs = {
              exerciseSevenofE: $("#" + exerciseInput[kay]).val().trim(),
              weightSevenofE:$("#" + weightInput[kay]).val().trim(),
              setsSevenofE: $("#" + setsInput[kay]).val().trim(),
              repsSevenofE: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 47:
            var workoutExerciseInputs = {
              exerciseEightofE: $("#" + exerciseInput[kay]).val().trim(),
              weightEightofE:$("#" + weightInput[kay]).val().trim(),
              setsEightofE: $("#" + setsInput[kay]).val().trim(),
              repsEightofE: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 48:
            var workoutExerciseInputs = {
              exerciseNineofE: $("#" + exerciseInput[kay]).val().trim(),
              weightNineofE:$("#" + weightInput[kay]).val().trim(),
              setsNineofE: $("#" + setsInput[kay]).val().trim(),
              repsNineofE: $("#" + repsInput[kay]).val().trim()
            };
            break;
          case 49:
            var workoutExerciseInputs = {
              exerciseTenofE: $("#" + exerciseInput[kay]).val().trim(),
              weightTenofE:$("#" + weightInput[kay]).val().trim(),
              setsTenofE: $("#" + setsInput[kay]).val().trim(),
              repsTenofE: $("#" + repsInput[kay]).val().trim()
            };
            break;
          default:
          console.log("default in switch case code of assigning an exercise, something wrong");
        }
        console.log("workoutExerciseInputs after submitting the first exercise: ", workoutExerciseInputs);
        var currentURL = window.location.origin;
          $.ajax(currentURL + "/api/createWorkout/" + userdata.id, {
            type: "PUT",
            data: workoutExerciseInputs
          }).then(function() {
            // I do this .get only to check. The arrays of data aren't created unless the page relaods.
            $.get("/api/specific_user_data/" + userdata.id).then(function(data) {
              console.log("object 'data' inside of .get AFTER submit of new exerise data: ", data);
              //console.log("testing testing to find individual values - workout name: " + data.dbUser[currentUser].workoutA);
            });
          });
      }


      $(document).on("click", "#moreExercises", function() {
        e++;
        kay++;
        enterExercises();
      });

      $(document).on("click", "#noMoreExercises", function() {
        console.log("User has finished inputting exercises for the particular workout!")
        //this reloads the page to more simply get the data from the db,
        // since it originally loads getting the data, and filling in the arrays.
        window.location.reload();
      });


          // This function happens when the user clicks the chosen workout.
      $(document).on("click", ".selectedWorkout", function() {
        $("#currentWorkout").show();
          // What happens? Hide previous divs. Show new actual workout div.
          // Build the workout page  -  where the user sees the title of workout, the exercises,
          // the weight, and corresponding sets buttons, and reps displayed after those buttons
          // are presssed.  Also the count up clock.
        selectedWorkout = $(this).text();
        console.log("the variable selectedWorkout: " + selectedWorkout);
        
        switch (selectedWorkout) {
          case data.workoutA: // could this also be workout[0]?
            // this worked. so call a function that needs to be created around the code below
            // and will probably include code to rewrite DOM instead of hardcoding in members.html
            //jay is a counter, it corresponds 0-9 for A, 10-19 for B, etc.
            // 12/26/2018 - just looking at this after a couple of weeks, and this code below
            // is from quite a while ago. first look says jay and kay need to be relooked at 
            // as they are not necessarily what I thought they were when this was created.
            // I'm also going to have to put each exercise in a repeatable js code to fit
            // in the div in the html file, instead of a div for each exercise in the html file.
            //  so the code below can be in a loop corresponding to the number of exercises, and
            // counting them up with kay, (the index in the exercise/weight/sets/reps arrays)
            // kay should not be set to 0 in this sections
            // jay is the index of workouts, kay is index of exercises, e is the number of exercises
            //  is this all correct????
            console.log("inside case workoutA of switch");
            kay = 0;
            createWorkout();
            break;
          case data.workoutB:
            console.log("inside case workoutB of switch");
            kay = 10;
            createWorkout();
            break;
          case data.workoutC:
            console.log("inside case workoutC of switch");
            kay = 20;
            createWorkout();
            break;
          case data.workoutD:
            console.log("inside case workoutD of switch");
            kay = 30;
            createWorkout();
            break;
          case data.workoutE:
            console.log("inside case workoutB of switch");
            kay = 40;
            createWorkout();
            break;
          default:
            console.log("not in case A or B");
        }

        function createWorkout() {
          $("#exercisesInfoButtons").empty();
          $("span#workout").empty();
          console.log("selectedWorkout = " + selectedWorkout);
          $("span#workout").text(selectedWorkout);
            for (var k = kay; k < (kay+10); k++) {
              if (exercise[k] === null || exercise[k] === "") {
              } else {
              console.log("k: " + k);
              console.log("exercise[k]: " + exercise[k]);
              var exerciseTitleInfo = $("<div>");
              exerciseTitleInfo.addClass("row");
              var exerciseTitle = $("<div>");
              exerciseTitle.addClass("col-md-3");
              exerciseTitle.append("<h3>" + exercise[k] + "</h3>");
              var exerciseInfo = $("<div>");
              exerciseInfo.addClass("col-md-3");
              exerciseInfo.addClass("col-md-offset-3");
              exerciseInfo.append("<h3>" + ' ' + sets[k] + ' sets X ' + ' ' + reps[k] +
                ' reps at ' + ' ' + weight[k] + 'lb' + "</h3>");
             // now append the 2 divs to the title/info div
              exerciseTitleInfo.append(exerciseTitle);
              exerciseTitleInfo.append(exerciseInfo);
              // need to build the button div
              var setsRepsButtons = $("<div>");
              setsRepsButtons.addClass("row");
              var actualButtons = $("<div>");
              for (var i = 0; i < sets[k]; i++) {
                var holder = $("<button>");
                holder.attr("type","button");
                holder.addClass("btn");
                holder.addClass("btn-success");
                holder.addClass("startTimer");
                holder.attr("data-reps", reps[k]);
                holder.attr("data-clicksofSetButton", clicksofSetButton);
                holder.attr("data-chosenSet", i);
                holder.attr("data-exercise", exercise[k]);
                holder.text("Reps");
                actualButtons.append(holder);
              }
              setsRepsButtons.append(actualButtons);
              $("#exercisesInfoButtons").append(exerciseTitleInfo);
              $("#exercisesInfoButtons").append(setsRepsButtons);
            }
          }
          // insert a Finish button here to end the workout, stop the timer.  
          var holder2 = $("<button>");
          holder2.attr("type","button");
          holder2.addClass("btn");
          holder2.addClass("btn-success");
          holder2.addClass("finishWorkout");
          holder2.text("Workout Finished");
          $("#exercisesInfoButtons").append(holder2);
        }

        $(document).on("click", ".finishWorkout", function() {
          stopTimer();
          // what else should happen?
          // add a note section?
          // put another logout button here?
          // incorporate some sort of function that stores the actual number of reps the
          // user finished?
          // go back to beginning "screen" with list of workouts.
          window.location.reload();
        });

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
          clearTimeout(myTimer);
          startCount = 0;
          $(".footer").hide();
        }

        // this function changes the .html (label) of each button
        // as the user clicks it. It must start at required number of reps
        // then go down by one with each press. after 0, it should go back to
        // REPS.  then start over.
        $(document).on("click", ".startTimer", function() {

          // Need to not stop and restart timer after each press of the same button
          // so set the variable that picks which button was just clicked
          // also, if doing super-sets, need to know which exercise the user is on,
          // so that the timer does stop if choosing the same set of a different exercise
          var indexofNewButton = parseInt($(this).attr("data-chosenSet"));
          var currentExercise = $(this).attr("data-exercise");
          
          // check to see if it's different than the previous button
          // so as to not start the timer over while user pics the number of reps completed.
          if ((indexofNewButton !== indexofPreviousButton) || (currentExercise !== previousExercise)) {
            stopTimer();
            timer();
          }
          
          console.log("indexofNewButton is " + indexofNewButton);
          console.log("indexofPreviousButton is " + indexofPreviousButton);
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
            previousExercise = currentExercise;
          } else {
            $(this).html(reps - clicksofSetButton);
            indexofPreviousButton = indexofNewButton;
            previousExercise = currentExercise;
          }
        });

      });

      $("#showWorkouts").on("click", function() {
        //reload the list of named workouts after the most recent creation
        //must redo .get as data rewritten here won't be seen above outside this function
        $.get("/api/specific_user_data/" + userdata.id).then(function(data) {
          console.log("object 'data' after click of show workouts button ", data);
          workout = [data.workoutA, data.workoutB, data.workoutC, data.workoutD, data.workoutE];
          console.log("workout array after click of show workouts button: " + workout);
          $("#availableWorkouts").empty();
          numWorkouts = 0;
          for (var i = 0; i < workout.length; i++) {
            if (workout[i] === null || workout[i] === "null") {
            } else {
              $("#availableWorkouts").append("<h3 class='selectedWorkout'>" + workout[i] + "</h3>");
              numWorkouts = numWorkouts + 1;
              console.log("inside .get of info in show workouts button: numWorkouts = " + numWorkouts);
            }
          }
        });
      });

    });

  });
});