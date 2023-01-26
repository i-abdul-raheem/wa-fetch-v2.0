const express = require("express");
const app = express();
var fileupload = require("express-fileupload");
const fs = require("fs"); // Import File system modules
const axios = require("axios"); // Import Axios
const routes = require("./routes/index");
const cors = require("cors");

// Set PORT
require("dotenv").config({ path: "../.env" });
const PORT = process.env.REACT_APP_API || 5000;

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
