// Dependencies
var express = require("express");
var db = require("../models");
console.log(db.Doctor);

// creating router
var router = express.Router();
  // get request to show the index.handlebars on the page 
  // shows all of the doctors items currently in the database on the page
  router.get("/doctors", function(req, res) {
      db.Doctor.findAll({
      }).then(function(data) {
          console.log(data)    
       res.render("doctors", {doctor: data});
      });
  });



  // post request to add a new to do item to the list of doctors
  // redirected back the the get request to show all the doctors, including the new one on the page
  router.post("/doctors", function(req, res) {
      db.Doctor.create({
        name: req.body.name,
        phone: req.body.phone,
        speciality: req.body.speciality,
        location: req.body.location,
        notes: req.body.notes
      }).then(function(data){
        res.redirect("/doctors");
      });
  });



  // put request to update the page when the doctor info changes
  router.put("/doctors/:id", function(req, res) {
      db.Doctor.update({
        name: req.body.name,
        phone: req.body.phone,
        speciality: req.body.speciality,
        location: req.body.location,
        notes: req.body.notes
      }, {
        where: {
          id: req.params.id
        }
      }).then(function(data) {
          res.redirect("/doctors");
      });
  });
// export routers
module.exports = router;