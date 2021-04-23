const router = require("express").Router();
// const db = require("../models/Workout.js");
const Workout = require("../models/Workout.js");


    router.get("/api/workouts", (req, res) => {
        Workout.find({}, (err, workout) => {
            if (err) {
                console.log(err);
            } else {
                res.json(workout)
            }
    });
});
 
    

    router.post("/api/workouts", (req, res) => {
       Workout.create({})
           .then(newWorkout => {
             res.json(newWorkout);
        })
        .catch(err => {
            res.json(err);
        });
    });


    router.put("/api/workouts/:id", ({ body, params }, res) => {
        Workout.findByIdAndUpdate({ _id: params.id}, 
            { $push: { exercises: body } },
            { new: true },
            updatedWorkout => {
                res.json(updatedWorkout);
            })
        });

        

    router.get("/api/workouts/range", (req, res) => {
        console.log("Range hit");
        Workout.aggregate([
            {
                $addFields: {
                    totalDuration: { $sum: "$exercises.duration" }
                }
            },
        ])
        .sort({ day: -1 }).limit(7)
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    }); 

    module.exports = router;