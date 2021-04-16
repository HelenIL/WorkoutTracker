const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3020;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout',
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true 
    }
  );

// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/workout';

// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
// });

require("./routes/htmlRoutes")(app);
// require("./routes/apiRoutes")(app);

app.listen(PORT, function() {
    console.log(`App running on port ${PORT}!`);
  });