var db = require("../models");

module.exports = function(app) {

 
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
    });
    

    app.post("/api/workouts", (req, res)=> {
        db.Workout.create({})
           .then(workout => {
             res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
    });


    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.findByIdAndUpdate(
            req.params.id, 
            { $push: { exercises: req.body } },
            { new: true } 
            )
            .then(workout => res.json(workout))
            .catch(err => res.json(err));
        });

        

    app.get("/api/workouts/range", (req, res) => {
        console.log("Range hit");
        db.Workout.find({})
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    }); 
};