const router = require("express").Router();
const Workout = require("../models/Workout.js");
const mongoose = require("mongoose");
const express = require("express");



 
    router.get("/api/workouts", (req, res) => {
        Workout.aggregate([
        {
        $addFields: {
            totalDuration: { $sum: "$exercises.duration" }
        }
    },
])
    .then(workouts => {
        res.json(workouts);
    })
    .catch(err => {
        res.json(err);
    });
});
 
    

    router.post("/api/workouts", (req, res) => {
        Workout.create({})
           .then(workouts => {
             res.json(workouts);
        })
        .catch(err => {
            res.json(err);
        });
    });


    router.put("/api/workouts/:id", ({ body, params }, res) => {
        Workout.findByIdAndUpdate(params.id, 
            { $push: { exercises: body } },
            { new: true } 
            )
            .then(workouts => res.json(workouts))
            .catch(err => {
                res.json(err)
            });
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
        .then(workouts => {
            res.json(workouts);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    }); 

    module.exports = router;