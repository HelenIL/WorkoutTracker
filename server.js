const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout',
    {
      useNewUrlParser: true,
      useFindAndModify: false
    }
  );

  require("./routes/htmlroutes")(app);
require("./routes/apiroutes")(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });