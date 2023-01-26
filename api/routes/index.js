const route = require("express").Router();
const cors = require("cors");
const login = require("./login");
const api = require("./api");
const file = require("./file");
const auth = require("../middlewares/authorization");

route.use("/login", login);
route.use("/api", auth, api);
route.use("/file", auth, file);

module.exports = route;