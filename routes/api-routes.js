

// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var express = require("express");

var router = express.Router();
// Requiring the burger model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(router) {

  // GET route for getting all of the burgers
  router.get("/", function(req, res) {
    db.Burger.findAll({})
    .then(function(dbBurger) {
      console.log(dbBurger);
      var burger = {burger:dbBurger};
      console.log(burger);
      res.render("index",burger);
    });
  });

  // POST route for saving a new burger
  router.post("/api/burgers", function(req, res) {
    console.log(req.body);
    db.Burger.create({
      burger_name: req.body.burger_name
    })
    .then(function(result) {
      res.json(result);
    });
  });

  // PUT route for updating devoured
  router.put("/api/burgers/:id", function(req, res) {
    db.Burger.update(
      req.body,{
      where: {
      id: req.params.id
    }
  })
    .then(function(result) {
      res.json(result);
    });
  });
};
