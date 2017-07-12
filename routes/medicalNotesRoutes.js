// Dependencies
var express = require("express");
var db = require("../models");
console.log(db.medicalNotes);

// creating router
var router = express.Router();
  // get request to show the index.handlebars on the page 
  // shows all of the medical notes items currently in the database on the page
  router.get("/medicalNotes", function(req, res) {
      db.medicalNotes.findAll({
      }).then(function(data) {
          console.log(data)    
       res.render("index", {doctor: data});
      });
  });



  // post request to add a new to do item to the list of medical notes
  // redirected back the the get request to show all the medical notes, including the new one on the page
  router.post("/medicalNotes", function(req, res) {
      db.medicalNotes.create({
        title: req.body.title,
        location: req.body.location,
        content: req.body.content
 
      }).then(function(data){
        res.redirect("/medicalNotes");
      });
  });



  // put request to update the page when the medical notes info changes
  router.put("/medicalNotes/:id", function(req, res) {
      db.medicalNotes.update({
        title: req.body.title,
        location: req.body.location,
        content: req.body.content
      }, 
      {
        where: {
          id: req.params.id
        }
      }).then(function(data) {
          res.redirect("/medicalNotes");
      });

      
  });
// export routers
module.exports = router;