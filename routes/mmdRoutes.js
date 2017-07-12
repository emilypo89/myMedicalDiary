// Dependencies
var express = require("express");
var db = require("../models");
console.log(db.Appointment);

// creating router
var router = express.Router();

  router.post("/users", function(req, res) {
      db.User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }).then(function(data){
        res.redirect("/users");
      });
  });

  router.get("/users/:id", function(req, res) {
      db.User.findOne({
        include: [{model: db.Appointment}],
        include: [{model: db.ToDo}],
        include: [{model: db.MedNotes}],
      where: {
        id: req.params.id
      }
      }).then(function(data) {
          console.log(data)    
        
       res.render("index", {user: data});
      });
  });


  // APPOINTMENT ROUTES
  // get request to show the index.handlebars on the page 
  // shows all of the doctors items currently in the database on the page
  router.get("/appointments/:id", function(req, res) {
      db.Appointment.findAll({
        include: [{model: db.User}],
        where: {
          UserId: req.params.id
        },
        order: [
    // Will escape username and validate DESC against a list of valid direction parameters
        ['date']
        ]
      }).then(function(data) {
          console.log(data)    
        var displayAppointment = {
        appointment: data,  
        date: data.date
      }
        console.log(displayAppointment);
       res.render("index", displayAppointment);
      });
  });

  // post request to add a new to do item to the list of doctors
  // redirected back the the get request to show all the doctors, including the new one on the page
  router.post("/appointments/:id", function(req, res) {
      db.Appointment.create({
        include: [{model: db.User}],
        UserId: req.params.id,
        date: req.body.date,
        time: req.body.time,
        category: req.body.category,
        location: req.body.location,
        title: req.body.title,
        notes: req.body.notes
      }).then(function(data){
        res.redirect("/appointments");
      });
  });

  // put request to update the page when the doctor info changes
  router.put("/appointments/:id", function(req, res) {
      db.Appointment.update({
        include: [{model: db.User}],
        UserId: req.params.id,
        date: req.body.date,
        time: req.body.time,
        category: req.body.category,
        location: req.body.location,
        title: req.body.title,
        notes: req.body.notes
      }, {
        where: {
          id: req.params.id
        }
      }).then(function(data) {
          res.redirect("/appointments");
      });
    });    
// delete request to delete an appointment
  router.delete("/appointment/:id", function(req, res) {
      db.Appointment.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(data) {
          res.redirect("/appointment");
      }); 
  });


// TODO ROUTES
  router.get("/todo/:id", function(req, res) {
      db.ToDo.findAll({
        include: [{model: db.User}],
        where: {
          UserId: req.params.id
        }
      }).then(function(data) {
          console.log(data)    
       res.render("index", {todo: data});
      });
  });
  // post request to add a new to do item to the list of to do items
  // redirected back the the get request to show all the to do items, including the new one on the page
  router.post("/todo/:id", function(req, res) {
      db.ToDo.create({
        include: [{model: db.User}],
        UserId: req.params.id,
        toDo: req.body.toDo
      }).then(function(data){
        res.redirect("/todo");
      });
  });
  // put request to update the page when the to do item changes
  router.put("/todo/:id", function(req, res) {
      db.ToDo.update({
        include: [{model: db.User}],
        UserId: req.params.id,
        toDo: req.body.toDo
      }, {
        where: {
          id: req.params.id
        }
      }).then(function(data) {
          res.redirect("/todo");
      });
  });  

  // delete request to delete a to do item
  router.delete("/todo/:id", function(req, res) {
      db.ToDo.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(data) {
          res.redirect("/todo");
      });     
  });

// MEDICAL NOTES ROUTES
  // get request to show the index.handlebars on the page 
  // shows all of the medical notes items currently in the database on the page
  router.get("/medicalNotes/:id", function(req, res) {
      db.MedNotes.findAll({
        include: [{model: db.User}],
        where: {
          UserId: req.params.id
        }
      }).then(function(data) {
        var medNote = {
          Note: data    
        }
       res.render("index", medNote);
      });
  });
  // post request to add a new to do item to the list of medical notes
  // redirected back the the get request to show all the medical notes, including the new one on the page
  router.post("/medicalNotes/:id", function(req, res) {
      db.MedNotes.create({
        include: [{model: db.User}],
        UserId: req.params.id,
        title: req.body.title,
        location: req.body.location,
        content: req.body.content,
        category: req.body.category
 
      }).then(function(data){
        res.redirect("/medicalNotes");
      });
  });
  // put request to update the page when the medical notes info changes
  router.put("/medicalNotes/:id", function(req, res) {
      db.MedNotes.update({
        include: [{model: db.User}],
        UserId: req.params.id,
        title: req.body.title,
        location: req.body.location,
        content: req.body.content,
        category: req.body.category
      }, 
      {
        where: {
          id: req.params.id
        }
      }).then(function(data) {
          res.redirect("/medicalNotes");
      });
  });

  router.delete("/medicalNotes/:id", function(req, res) {
      db.MedNotes.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(data) {
          res.redirect("/medicalNotes");
      }); 
    });    

//DOCTORS

 // get request to show the index.handlebars on the page 
  // shows all of the doctors items currently in the database on the page
  router.get("/doctors/:id", function(req, res) {
      db.Doctor.findAll({
        include: [{model: db.User}],
        where: {
          UserId: req.params.id
        }
      }).then(function(data) {
          console.log(data)    
       res.render("doctors", {doctor: data});
      });
  });



  // post request to add a new to do item to the list of doctors
  // redirected back the the get request to show all the doctors, including the new one on the page
  router.post("/doctors/:id", function(req, res) {
      db.Doctor.create({
        include: [{model: db.User}],
        UserId: req.params.id,
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
        include: [{model: db.User}],
        UserId: req.params.id,
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

  // delete request to delete a doctor
  router.delete("/doctors/:id", function(req, res) {
      db.Doctor.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(data) {
          res.redirect("/doctors");
      });
  });     

// export routers
module.exports = router;