const express = require('express');
const { connect } = require('mongoose');
const connectDB = require('./config/db');
require("dotenv").config();
var cors = require("cors");
const app = express();
const articles = require("./routes/api/articles");
const bodyParser = require("body-parser");
const path = require('path');
//maybe not
require("./models/Article");
require("./routes/api/articles.js");
//app.use(allowCrossDomain);

connectDB();

app.use(express.json({ extended: false }));
app.use(cors({ origin: true, credentials: true, optionsSuccessStatus: 200 }));

app.use("/api/articles", articles);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  console.log("production version " + process.env.NODE_ENV);
  app.use(express.static(path.resolve(__dirname, "./frontend/build")));
  app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname + "/frontend/build/index.html"));
  });
} else console.log("development version " + process.env.NODE_ENV);

app.get("/", (req, res) => {
  res.json(app.stack);
});
//update books via app.use
const PORT = (5555 || process.env.PORT);
app.listen(PORT, () =>
  console.log(`Server up @ ${PORT} process env port = ${process.env.PORT}`)
);
if (process.env.NODE_ENV == "production") {
  console.log("production is running");
} else console.log("development is running");
