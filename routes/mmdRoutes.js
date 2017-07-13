// Dependencies
var express = require("express");
var db = require("../models");
var passport = require("../config/passport");

var isAuthenticated = require("../config/middleware/isAuthenticated.js");
// console.log(db.Appointment);

// creating router
var router = express.Router();

  router.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("index");
    }
    res.render("index");
  });

  router.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("index");
    }
    res.render("signUp");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  router.get("/users/:id", isAuthenticated, function(req, res) {
    res.redirect("index");
  });

   // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  router.post("/signIn", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.render("index");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  // app.post("/api/signup", function(req, res) {
  //   console.log(req.body);
  //   db.User.create({
  //     email: req.body.email,
  //     password: req.body.password
  //   }).then(function() {
  //     res.redirect(307, "/api/login");
  //   }).catch(function(err) {
  //     res.status(422).json(err.errors[0].message);
  //   });
  // });

  // Route for logging user out
  router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/signIn");
  });

  // // Route for getting some data about our user to be used client side
  router.get("/signIn", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.redirect("signUp")
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      db.User.findOne({
        include: [{model: db.Appointment}, {model:db.ToDo}, {model: db.MedNotes}],
      where: {
        id: req.params.id
      }
      }).then(function(data) { 
          var cleanData = JSON.parse(JSON.stringify(data));
          console.log(cleanData)
       res.render("index", {user: data});
      });
    }
  });


// Route to rend the signUp page
  router.get("/users", function(req, res) {
    res.render("signUp");
  });

  router.get("/signIn", function(req, res) {
    res.render("signIn");
  });

// Route to create a new user
  router.post("/users", function(req, res) {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }).then(function(data){
      console.log(data.dataValues.id);

      res.redirect("/users/" + data.dataValues.id);
    }).catch(function(err) {
      res.status(422).json(err.errors[0].message);
    });
  });

// Route to render the homepage with a specific users information from the appointment, to do, and med notes tables
  router.get("/users/:id", function(req, res) {
      db.User.findOne({
        include: [{model: db.Appointment}, {model:db.ToDo}, {model: db.MedNotes}],
      where: {
        id: req.params.id
      }
      }).then(function(data) { 
          var cleanData = JSON.parse(JSON.stringify(data));
          console.log(cleanData)
       res.render("index", {user: data});
      });
  });


// APPOINTMENT ROUTES
// Post request to create a new appointment 
  router.post("/appointments/:id", function(req, res) {
    db.Appointment.create({
      UserId: req.params.id,
      date: req.body.date,
      time: req.body.time,
      category: req.body.category,
      location: req.body.location,
      title: req.body.title,
      notes: req.body.notes
    }).then(function(data){
      res.redirect("/users/" + data.dataValues.id);
    });
  });

// Put request to update the appointments
  router.put("/appointments/:id", function(req, res) {
    db.Appointment.update({
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
        res.redirect("/users/" + data.dataValues.id);
    });
  });    

// Delete Route to delete an appointment
  router.delete("/appointment/:id", function(req, res) {
    db.Appointment.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(data) {
        res.redirect("/users/" + data.dataValues.id);
    }); 
  });


// TODO ROUTES
// Post request to add a new to do item to the list of to do items
router.get("/todo/:id", function(req, res) {
      db.User.findAll({
        where: {
          id: req.params.id
        }
      }).then(function(data) {
          console.log("data: " + data)    
         var cleanData = JSON.parse(JSON.stringify(data));
          console.log("clean data: " + cleanData);
          var object = {
            modal: data
          }
          console.log("object: " + object.modal[0].toDo);
          var toDo = object.modal[0].toDo;
          var toDoId = object.modal[0].id;
          // res.redirect(“/users/” + object.modal[0].UserId);
       return toDo;
       return toDoId;
       res.send(toDo, toDoId);

     });
  });

  router.post("/todo/:id", function(req, res) {
    db.ToDo.create({
      UserId: req.params.id,
      toDo: req.body.toDo
    }).then(function(data){
        console.log(data);
      res.redirect("back");
    });
  });

// Put request to update the page when the to do item changes
  router.put("/todo/:id", function(req, res) {
    db.ToDo.update({
      // UserId: req.params.id,
      toDo: req.body.toDo
    }, {
      where: {
        id: req.params.id
      } 
    }).then(function(data) {
      console.log(data);
        res.redirect("back");
    });
  });  

// Delete request to delete a to do item
  router.delete("/todo/:id", function(req, res) {
    db.ToDo.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(data) {
        res.redirect("back");
    });     
  });

// MEDICAL NOTES ROUTES
// Post request to add a new to do item to the list of medical notes
  router.post("/medicalNotes/:id", function(req, res) {
    db.MedNotes.create({
      include: [{model: db.User}],
      UserId: req.params.id,
      title: req.body.title,
      location: req.body.location,
      content: req.body.content,
      category: req.body.category

    }).then(function(data){
      res.redirect("back");
    });
  });

// Put request to update the page when the medical notes info changes
  router.put("/medicalNotes/:id", function(req, res) {
    db.MedNotes.update({
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
        res.redirect("back");
    });
  });

// Delete route to delete a medical note
  router.delete("/medicalNotes/:id", function(req, res) {
    db.MedNotes.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(data) {
        res.redirect("back");
    }); 
  });    

//DOCTORS
// Get request to show the doctors.handlebars on the page 
  router.get("/users/doctors/:id", function(req, res) {
    db.User.findOne({
        include: [{model: db.Doctor}],
      where: {
        id: req.params.id
      }
      }).then(function(data) {
          var cleanData = JSON.parse(JSON.stringify(data));
          console.log(cleanData)
       res.render("doctors", {user: data});
      });
  });

// Post request to add a new to do item to the list of doctors
  router.post("/users/doctors/:id", function(req, res) {
    db.Doctor.create({
      UserId: req.params.id,
      name: req.body.name,
      phone: req.body.phone,
      speciality: req.body.speciality,
      location: req.body.location,
      notes: req.body.notes
    }).then(function(data){
      res.redirect("back");
    });
  });

// Put request to update the page when the doctor info changes
  router.put("/users/doctors/:id", function(req, res) {
    db.Doctor.update({
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
        res.redirect("back");
    });
  });  

// Delete request to delete a doctor
  router.delete("/users/doctors/:id", function(req, res) {
    db.Doctor.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(data) {
        res.redirect("back");
    });
  });     

// export routers
module.exports = router;