

// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var express = require("express");

var router = express.Router();
// Requiring the user models
var db = require("../models");
var passport = require("../config/passport");

// Routes
// =============================================================
module.exports = function(router) {

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  router.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will route on the front end
    // They won't get this or even be able to access this page if they aren't authorized
    res.json("/members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  router.post("/api/signup", function(req, res) {
    console.log("in post route /api/signup: ", req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // DELETE route for deleting users. We get the id of the user to be deleted from
  // req.params.id
  router.delete("/api/deleteUser/:id", function(req, res) {
    // Specify which user to destroy with "where"
    // now continue with original delete request
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(numUser) {
      res.json(numUser);
      console.log("number of deleted users (should be 1): ", numUser);
    });
  });

  // create a route for deleting a workout name for now
  // add in deleting all the exercises later
  router.delete("/api/deleteWorkout")

  // PUT route for updating name for workout
  router.put("/api/createWorkout/:id", function(req, res) {
    console.log("inside put route /api/createWorkout/:id - req.body: ", req.body);
    db.User.update(
      req.body,{
      where: {
      id: req.params.id
      }
    })
    .then(function(result) {
      res.json(result);
      console.log("inside .then route /api/createWorkout/:id - result: ", result);
    });
  });

  // Route for logging user out
  router.get("/logout", function(req, res) {
    console.log("I'm inside /logout function");
    req.logout();
    console.log("I've req.logout");
    res.redirect("/");
    console.log("I've redirected");
  });

  // Route for getting data about the user
  router.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise, this sends back the user's email and id as they were input, not from the db
      res.json({
        id: req.user.id,
        email: req.user.email
      });
    }
  });

  // Below gets the data from just one user (the current user) in the db
  router.get("/api/specific_user_data/:id", function(req, res) {
      //console.log("this is req in the .get of api-routes.js", req);
      db.User.findAll({
        // add a WHERE here to just get the current id.
        where: {
          id: req.params.id
        }
      })
      .then(function(dbUser) {
        //console.log("dbUser from inside the .get for a specific user", dbUser);
        console.log("after get route - dbUser[0].dataValues.workoutA = " + dbUser[0].dataValues.workoutA);
        res.json({
          workoutA: dbUser[0].dataValues.workoutA,
          exerciseOneofA: dbUser[0].dataValues.exerciseOneofA,
          weightOneofA: dbUser[0].dataValues.weightOneofA,
          setsOneofA: dbUser[0].dataValues.setsOneofA,
          repsOneofA: dbUser[0].dataValues.repsOneofA,
          exerciseTwoofA: dbUser[0].dataValues.exerciseTwoofA,
          weightTwoofA: dbUser[0].dataValues.weightTwoofA,
          setsTwoofA: dbUser[0].dataValues.setsTwoofA,
          repsTwoofA: dbUser[0].dataValues.repsTwoofA,
          exerciseThreeofA: dbUser[0].dataValues.exerciseThreeofA,
          weightThreeofA: dbUser[0].dataValues.weightThreeofA,
          setsThreeofA: dbUser[0].dataValues.setsThreeofA,
          repsThreeofA: dbUser[0].dataValues.repsThreeofA,
          exerciseFourofA: dbUser[0].dataValues.exerciseFourofA,
          weightFourofA: dbUser[0].dataValues.weightFourofA,
          setsFourofA: dbUser[0].dataValues.setsFourofA,
          repsFourofA: dbUser[0].dataValues.repsFourofA,
          exerciseFiveofA: dbUser[0].dataValues.exerciseFiveofA,
          weightFiveofA: dbUser[0].dataValues.weightFiveofA,
          setsFiveofA: dbUser[0].dataValues.setsFiveofA,
          repsFiveofA: dbUser[0].dataValues.repsFiveofA,
          exerciseSixofA: dbUser[0].dataValues.exerciseSixofA,
          weightSixofA: dbUser[0].dataValues.weightSixofA,
          setsSixofA: dbUser[0].dataValues.setsSixofA,
          repsSixofA: dbUser[0].dataValues.repsSixofA,
          exerciseSevenofA: dbUser[0].dataValues.exerciseSevenofA,
          weightSevenofA: dbUser[0].dataValues.weightSevenofA,
          setsSevenofA: dbUser[0].dataValues.setsSevenofA,
          repsSevenofA: dbUser[0].dataValues.repsSevenofA,
          exerciseEightofA: dbUser[0].dataValues.exerciseEightofA,
          weightEightofA: dbUser[0].dataValues.weightEightofA,
          setsEightofA: dbUser[0].dataValues.setsEightofA,
          repsEightofA: dbUser[0].dataValues.repsEightofA,
          exerciseNineofA: dbUser[0].dataValues.exerciseNineofA,
          weightNineofA: dbUser[0].dataValues.weightNineofA,
          setsNineofA: dbUser[0].dataValues.setsNineofA,
          repsNineofA: dbUser[0].dataValues.repsNineofA,
          exerciseTenofA: dbUser[0].dataValues.exerciseTenofA,
          weightTenofA: dbUser[0].dataValues.weightTenofA,
          setsTenofA: dbUser[0].dataValues.setsTenofA,
          repsTenofA: dbUser[0].dataValues.repsTenofA,
          workoutB: dbUser[0].dataValues.workoutB,
          exerciseOneofB: dbUser[0].dataValues.exerciseOneofB,
          weightOneofB: dbUser[0].dataValues.weightOneofB,
          setsOneofB: dbUser[0].dataValues.setsOneofB,
          repsOneofB: dbUser[0].dataValues.repsOneofB,
          exerciseTwoofB: dbUser[0].dataValues.exerciseTwoofB,
          weightTwoofB: dbUser[0].dataValues.weightTwoofB,
          setsTwoofB: dbUser[0].dataValues.setsTwoofB,
          repsTwoofB: dbUser[0].dataValues.repsTwoofB,
          exerciseThreeofB: dbUser[0].dataValues.exerciseThreeofB,
          weightThreeofB: dbUser[0].dataValues.weightThreeofB,
          setsThreeofB: dbUser[0].dataValues.setsThreeofB,
          repsThreeofB: dbUser[0].dataValues.repsThreeofB,
          exerciseFourofB: dbUser[0].dataValues.exerciseFourofB,
          weightFourofB: dbUser[0].dataValues.weightFourofB,
          setsFourofB: dbUser[0].dataValues.setsFourofB,
          repsFourofB: dbUser[0].dataValues.repsFourofB,
          exerciseFiveofB: dbUser[0].dataValues.exerciseFiveofB,
          weightFiveofB: dbUser[0].dataValues.weightFiveofB,
          setsFiveofB: dbUser[0].dataValues.setsFiveofB,
          repsFiveofB: dbUser[0].dataValues.repsFiveofB,
          exerciseSixofB: dbUser[0].dataValues.exerciseSixofB,
          weightSixofB: dbUser[0].dataValues.weightSixofB,
          setsSixofB: dbUser[0].dataValues.setsSixofB,
          repsSixofB: dbUser[0].dataValues.repsSixofB,
          exerciseSevenofB: dbUser[0].dataValues.exerciseSevenofB,
          weightSevenofB: dbUser[0].dataValues.weightSevenofB,
          setsSevenofB: dbUser[0].dataValues.setsSevenofB,
          repsSevenofB: dbUser[0].dataValues.repsSevenofB,
          exerciseEightofB: dbUser[0].dataValues.exerciseEightofB,
          weightEightofB: dbUser[0].dataValues.weightEightofB,
          setsEightofB: dbUser[0].dataValues.setsEightofB,
          repsEightofB: dbUser[0].dataValues.repsEightofB,
          exerciseNineofB: dbUser[0].dataValues.exerciseNineofB,
          weightNineofB: dbUser[0].dataValues.weightNineofB,
          setsNineofB: dbUser[0].dataValues.setsNineofB,
          repsNineofB: dbUser[0].dataValues.repsNineofB,
          exerciseTenofB: dbUser[0].dataValues.exerciseTenofB,
          weightTenofB: dbUser[0].dataValues.weightTenofB,
          setsTenofB: dbUser[0].dataValues.setsTenofB,
          repsTenofB: dbUser[0].dataValues.repsTenofB,
          workoutC: dbUser[0].dataValues.workoutC,
          exerciseOneofC: dbUser[0].dataValues.exerciseOneofC,
          weightOneofC: dbUser[0].dataValues.weightOneofC,
          setsOneofC: dbUser[0].dataValues.setsOneofC,
          repsOneofC: dbUser[0].dataValues.repsOneofC,
          exerciseTwoofC: dbUser[0].dataValues.exerciseTwoofC,
          weightTwoofC: dbUser[0].dataValues.weightTwoofC,
          setsTwoofC: dbUser[0].dataValues.setsTwoofC,
          repsTwoofC: dbUser[0].dataValues.repsTwoofC,
          exerciseThreeofC: dbUser[0].dataValues.exerciseThreeofC,
          weightThreeofC: dbUser[0].dataValues.weightThreeofC,
          setsThreeofC: dbUser[0].dataValues.setsThreeofC,
          repsThreeofC: dbUser[0].dataValues.repsThreeofC,
          exerciseFourofC: dbUser[0].dataValues.exerciseFourofC,
          weightFourofC: dbUser[0].dataValues.weightFourofC,
          setsFourofC: dbUser[0].dataValues.setsFourofC,
          repsFourofC: dbUser[0].dataValues.repsFourofC,
          exerciseFiveofC: dbUser[0].dataValues.exerciseFiveofC,
          weightFiveofC: dbUser[0].dataValues.weightFiveofC,
          setsFiveofC: dbUser[0].dataValues.setsFiveofC,
          repsFiveofC: dbUser[0].dataValues.repsFiveofC,
          exerciseSixofC: dbUser[0].dataValues.exerciseSixofC,
          weightSixofC: dbUser[0].dataValues.weightSixofC,
          setsSixofC: dbUser[0].dataValues.setsSixofC,
          repsSixofC: dbUser[0].dataValues.repsSixofC,
          exerciseSevenofC: dbUser[0].dataValues.exerciseSevenofC,
          weightSevenofC: dbUser[0].dataValues.weightSevenofC,
          setsSevenofC: dbUser[0].dataValues.setsSevenofC,
          repsSevenofC: dbUser[0].dataValues.repsSevenofC,
          exerciseEightofC: dbUser[0].dataValues.exerciseEightofC,
          weightEightofC: dbUser[0].dataValues.weightEightofC,
          setsEightofC: dbUser[0].dataValues.setsEightofC,
          repsEightofC: dbUser[0].dataValues.repsEightofC,
          exerciseNineofC: dbUser[0].dataValues.exerciseNineofC,
          weightNineofC: dbUser[0].dataValues.weightNineofC,
          setsNineofC: dbUser[0].dataValues.setsNineofC,
          repsNineofC: dbUser[0].dataValues.repsNineofC,
          exerciseTenofC: dbUser[0].dataValues.exerciseTenofC,
          weightTenofC: dbUser[0].dataValues.weightTenofC,
          setsTenofC: dbUser[0].dataValues.setsTenofC,
          repsTenofC: dbUser[0].dataValues.repsTenofC,
          workoutD: dbUser[0].dataValues.workoutD,
          exerciseOneofD: dbUser[0].dataValues.exerciseOneofD,
          weightOneofD: dbUser[0].dataValues.weightOneofD,
          setsOneofD: dbUser[0].dataValues.setsOneofD,
          repsOneofD: dbUser[0].dataValues.repsOneofD,
          exerciseTwoofD: dbUser[0].dataValues.exerciseTwoofD,
          weightTwoofD: dbUser[0].dataValues.weightTwoofD,
          setsTwoofD: dbUser[0].dataValues.setsTwoofD,
          repsTwoofD: dbUser[0].dataValues.repsTwoofD,
          exerciseThreeofD: dbUser[0].dataValues.exerciseThreeofD,
          weightThreeofD: dbUser[0].dataValues.weightThreeofD,
          setsThreeofD: dbUser[0].dataValues.setsThreeofD,
          repsThreeofD: dbUser[0].dataValues.repsThreeofD,
          exerciseFourofD: dbUser[0].dataValues.exerciseFourofD,
          weightFourofD: dbUser[0].dataValues.weightFourofD,
          setsFourofD: dbUser[0].dataValues.setsFourofD,
          repsFourofD: dbUser[0].dataValues.repsFourofD,
          exerciseFiveofD: dbUser[0].dataValues.exerciseFiveofD,
          weightFiveofD: dbUser[0].dataValues.weightFiveofD,
          setsFiveofD: dbUser[0].dataValues.setsFiveofD,
          repsFiveofD: dbUser[0].dataValues.repsFiveofD,
          exerciseSixofD: dbUser[0].dataValues.exerciseSixofD,
          weightSixofD: dbUser[0].dataValues.weightSixofD,
          setsSixofD: dbUser[0].dataValues.setsSixofD,
          repsSixofD: dbUser[0].dataValues.repsSixofD,
          exerciseSevenofD: dbUser[0].dataValues.exerciseSevenofD,
          weightSevenofD: dbUser[0].dataValues.weightSevenofD,
          setsSevenofD: dbUser[0].dataValues.setsSevenofD,
          repsSevenofD: dbUser[0].dataValues.repsSevenofD,
          exerciseEightofD: dbUser[0].dataValues.exerciseEightofD,
          weightEightofD: dbUser[0].dataValues.weightEightofD,
          setsEightofD: dbUser[0].dataValues.setsEightofD,
          repsEightofD: dbUser[0].dataValues.repsEightofD,
          exerciseNineofD: dbUser[0].dataValues.exerciseNineofD,
          weightNineofD: dbUser[0].dataValues.weightNineofD,
          setsNineofD: dbUser[0].dataValues.setsNineofD,
          repsNineofD: dbUser[0].dataValues.repsNineofD,
          exerciseTenofD: dbUser[0].dataValues.exerciseTenofD,
          weightTenofD: dbUser[0].dataValues.weightTenofD,
          setsTenofD: dbUser[0].dataValues.setsTenofD,
          repsTenofD: dbUser[0].dataValues.repsTenofD,
          workoutE: dbUser[0].dataValues.workoutE,
          exerciseOneofE: dbUser[0].dataValues.exerciseOneofE,
          weightOneofE: dbUser[0].dataValues.weightOneofE,
          setsOneofE: dbUser[0].dataValues.setsOneofE,
          repsOneofE: dbUser[0].dataValues.repsOneofE,
          exerciseTwoofE: dbUser[0].dataValues.exerciseTwoofE,
          weightTwoofE: dbUser[0].dataValues.weightTwoofE,
          setsTwoofE: dbUser[0].dataValues.setsTwoofE,
          repsTwoofE: dbUser[0].dataValues.repsTwoofE,
          exerciseThreeofE: dbUser[0].dataValues.exerciseThreeofE,
          weightThreeofE: dbUser[0].dataValues.weightThreeofE,
          setsThreeofE: dbUser[0].dataValues.setsThreeofE,
          repsThreeofE: dbUser[0].dataValues.repsThreeofE,
          exerciseFourofE: dbUser[0].dataValues.exerciseFourofE,
          weightFourofE: dbUser[0].dataValues.weightFourofE,
          setsFourofE: dbUser[0].dataValues.setsFourofE,
          repsFourofE: dbUser[0].dataValues.repsFourofE,
          exerciseFiveofE: dbUser[0].dataValues.exerciseFiveofE,
          weightFiveofE: dbUser[0].dataValues.weightFiveofE,
          setsFiveofE: dbUser[0].dataValues.setsFiveofE,
          repsFiveofE: dbUser[0].dataValues.repsFiveofE,
          exerciseSixofE: dbUser[0].dataValues.exerciseSixofE,
          weightSixofE: dbUser[0].dataValues.weightSixofE,
          setsSixofE: dbUser[0].dataValues.setsSixofE,
          repsSixofE: dbUser[0].dataValues.repsSixofE,
          exerciseSevenofE: dbUser[0].dataValues.exerciseSevenofE,
          weightSevenofE: dbUser[0].dataValues.weightSevenofE,
          setsSevenofE: dbUser[0].dataValues.setsSevenofE,
          repsSevenofE: dbUser[0].dataValues.repsSevenofE,
          exerciseEightofE: dbUser[0].dataValues.exerciseEightofE,
          weightEightofE: dbUser[0].dataValues.weightEightofE,
          setsEightofE: dbUser[0].dataValues.setsEightofE,
          repsEightofE: dbUser[0].dataValues.repsEightofE,
          exerciseNineofE: dbUser[0].dataValues.exerciseNineofE,
          weightNineofE: dbUser[0].dataValues.weightNineofE,
          setsNineofE: dbUser[0].dataValues.setsNineofE,
          repsNineofE: dbUser[0].dataValues.repsNineofE,
          exerciseTenofE: dbUser[0].dataValues.exerciseTenofE,
          weightTenofE: dbUser[0].dataValues.weightTenofE,
          setsTenofE: dbUser[0].dataValues.setsTenofE,
          repsTenofE: dbUser[0].dataValues.repsTenofE
        });
      });
  });

  // // GET route for getting all of the burgers
  // router.get("/", function(req, res) {
  //   db.Burger.findAll({})
  //   .then(function(dbBurger) {
  //     // console.log(dbBurger);
  //     var burger = {burger:dbBurger};
  //     // console.log(burger);
  //     res.render("index",burger);
  //   });
  // });

  // // POST route for saving a new burger
  // router.post("/api/burgers", function(req, res) {
  //   // console.log(req.body);
  //   db.Burger.create({
  //     burger_name: req.body.burger_name
  //   })
  //   .then(function(result) {
  //     res.json(result);
  //   });
  // });

  // // PUT route for updating devoured
  // router.put("/api/burgers/:id", function(req, res) {
  //   db.Burger.update(
  //     req.body,{
  //     where: {
  //     id: req.params.id
  //   }
  // })
  //   .then(function(result) {
  //     res.json(result);
  //   });
  // });
};
