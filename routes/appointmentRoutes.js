// Dependencies
var express = require("express");
var db = require("../models");
console.log(db.Appointment);

// creating router
var router = express.Router();
  // get request to show the index.handlebars on the page 
  // shows all of the doctors items currently in the database on the page
  router.get("/appointments", function(req, res) {
      db.Appointment.findAll({
        // include: [{model: db.Doctor}]
      }).then(function(data) {
          console.log(data)    
        var displayAppointment = {
        appointment: data,  
        date: data.date
      }
       res.render("index", displayAppointment);
      });
  });



  // post request to add a new to do item to the list of doctors
  // redirected back the the get request to show all the doctors, including the new one on the page
  router.post("/appointments", function(req, res) {
      db.Appointment.create({
        // include: [{model: db.Doctor}],
        date: req.body.date,
        time: req.body.time,
        category: req.body.category,
        location: req.body.location,
        notes: req.body.notes
      }).then(function(data){
        res.redirect("/appointments");
      });
  });



  // put request to update the page when the doctor info changes
  router.put("/appointments/:id", function(req, res) {
      db.Doctor.update({
        // include: [{model: db.Doctor}],
        date: req.body.date,
        time: req.body.time,
        category: req.body.category,
        location: req.body.location,
        notes: req.body.notes
      }, {
        where: {
          id: req.params.id
        }
      }).then(function(data) {
          res.redirect("/appointments");
      });
  });
// export routers
module.exports = router;