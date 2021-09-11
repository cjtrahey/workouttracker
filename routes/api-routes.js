const db = require("../models");
require("mongoose");

module.exports = (app) => {


    // creation of a workout

    app.post("/api/workouts", (req, res) => {


        db.Workout.create({}).then(data => res.json(data))


        .catch(err => {

            console.log("error", err);

            res.json(err);

          });
    });

    // adding an exercise 

    app.put("/api/workouts/:id", (req, res) => {


        db.Workout.findByIdAndUpdate(req.params.id,

            {$push: {exercises: req.body}},
            {new: true, runValidators: true})
            
        .then(data => res.json(data))

        .catch(err => {

            console.log("error", err);

            res.json(err);

          });

    });

    // find all workouts within range

    app.get("/api/workouts/range", (req, res) => {

        //had  -->         .limit(7)
        //had -->          .sort({ _id: -1 }).limit(7)

        db.Workout.find({}).limit(7).then(data => res.json(data))


        .catch(err => {

            console.log("error", err);

            res.json(err);

          });

    });   

    // get the last workout

    app.get("/api/workouts", (req, res) => {


        db.Workout.find({}).then(data => res.json(data))


        .catch(err => {

            console.log("error", err);

            res.json(err);

          });

    });
  
    // catch-all on the "/"

    app.get("*", (req, res) => {

        res.redirect("/");

    });

};