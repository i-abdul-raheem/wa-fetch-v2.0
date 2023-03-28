const route = require("express").Router();
const login = require("./login");
const api = require("./api");
const file = require("./file");
const scan = require("./scan");
const auth = require("../middlewares/authorization");

route.use("/login", login);
route.use("/api", auth, api);
route.use("/file", auth, file);
route.use("/", scan);

module.exports = route;