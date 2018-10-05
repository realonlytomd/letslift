

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
    // So we're sending the user back the route to the members page because the redirect will hrouteren on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  router.post("/api/signup", function(req, res) {
    console.log(req.body);
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

  // PUT route for updating name and inputs for workout
  router.put("/api/createWorkoutA/:id", function(req, res) {
    db.User.update(
      req.body,{
      where: {
      id: req.params.id
    }
  })
    .then(function(result) {
      res.json(result);
    });
  });

  // Route for logging user out
  router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about the user
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
        console.log("dbUser from inside the .get for a specific user", dbUser);
        console.log("dbUser[0].dataValues.workoutA = " + dbUser[0].dataValues.workoutA);
        res.json({
          workoutA: dbUser[0].dataValues.workoutA,
          exerciseOneofA: dbUser[0].dataValues.exerciseOneofA,
          weightOneofA: dbUser[0].dataValues.weightOneofA,
          setsOneofA: dbUser[0].dataValues.setsOneofA,
          repsOneofA: dbUser[0].dataValues.repsOneofA,
          exerciseTwoofA: dbUser[0].dataValues.exerciseTwoofA,
          weightTwoofA: dbUser[0].dataValues.weightTwoofA,
          setsTwoofA: dbUser[0].dataValues.setsTwoofA,
          repsTwoofA: dbUser[0].dataValues.repsTwoofA
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
