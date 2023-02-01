const express = require("express");
const app = express();
var fileupload = require("express-fileupload");
const routes = require("./routes/index");
const cors = require("cors");
const mongoose = require("mongoose");

// Set PORT
require("dotenv").config({ path: "../.env" });
const PORT = process.env.REACT_APP_API || 5000;


// Mongoose
mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.ATLAS_URI,
  {
    useNewUrlParser: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const bodyParser = require("body-parser");

// Middlewares
app.use(cors());
app.use(fileupload());
app.use(express.static("../files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);

app.get("/", async (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server Started: http://localhost:${PORT}`);
});
