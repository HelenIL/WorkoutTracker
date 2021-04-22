const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require('dotenv').config()

const PORT = process.env.PORT || 3020;

const app = express();
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// console.log("DB string", process.env.MONGODB_URI);

app.use(require("./routes/apiRoutes.js"));
app.use(require("./routes/htmlRoutes.js"));

var uri = "mongodb+srv://Admin:pass1234@cluster0.28pwf.mongodb.net/workout?retryWrites=true&w=majorityretryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);





app.listen(PORT, function() {
    console.log(`App running on port ${PORT}!`);
  });