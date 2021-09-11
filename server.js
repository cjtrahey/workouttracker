const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3000 ;

// defining app as express

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


// connecting with MongoDB via mongoose at our myapp database running locally on default port 27017

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });


require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);


app.listen(PORT, () => {

    console.log(`Application is running on http://localhost:${PORT}`);

});