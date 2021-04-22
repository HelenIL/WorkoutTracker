const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require('dotenv').config();

const PORT = process.env.PORT || 3020;

const app = express();
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// console.log("DB string", process.env.MONGODB_URI);

app.use(require("./routes/apiRoutes.js"));
app.use(require("./routes/htmlRoutes.js"));

var uri = process.env.MONGODB_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

let db = mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workout",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);



app.use(router);
require("./routes/html.js")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

module.exports = db;