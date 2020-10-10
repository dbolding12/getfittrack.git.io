//Install Dependencies...
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

//Express App Setup... 
const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));

// Express App Data Parsing...
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Reveal config bar in heroku settings... After app is created... 
//db mongo. Value, for Heroku, will be mongo url in notes without quotes. The key MONGODB_URI...
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false
})

//Routes...
require("./routes/api.js")(app);
require("./routes/html.js")(app);

//Server Listening...
app.listen(PORT, function(){
    console.log("App listening at http://localhost:"+PORT);
});