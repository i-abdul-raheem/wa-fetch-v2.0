const route = require("express").Router();
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/authorization");
const { User } = require("../model/model");

const setResponse = (res, message = null, data = null, status = 200) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

route.post("/", async (req, res) => {
  const data = req.body;
  if (!data.username) {
    return setResponse(res, "Username is required", null, 405);
  }
  if (!data.password) {
    return setResponse(res, "Password is required", null, 405);
  }
  const userFound = await User.findOne({
    username: data.username,
    password: data.password,
  });
  if (!userFound)
    return setResponse(res, "Username/Password not correct", null, 404);
  const token = jwt.sign(
    { username: userFound.username },
    process.env.REACT_APP_SECRET,
    { expiresIn: "86400s" }
  );
  return setResponse(res, "Login Successful", {
    token,
    username: userFound.username,
  });
});

route.put("/", auth, async (req, res) => {
  const data = req.body;
  if (!data.password0)
    return setResponse(res, "Cuurrent password is required", null, 405);
  if (data.password0.length < 8)
    return setResponse(
      res,
      "Password length should be 8 or greater",
      null,
      405
    );
  if (!data.password1)
    return setResponse(res, "New password is required", null, 405);
  if (data.password1.length < 8)
    return setResponse(
      res,
      "New Password length should be 8 or greater",
      null,
      405
    );
  if (!data.password2)
    return setResponse(res, "Confirm password is required", null, 405);
  if (data.password1 !== data.password2)
    return setResponse(
      res,
      "Confirm password not matched with new password",
      null,
      405
    );
  if (!data.username)
    return setResponse(res, "Username is required", null, 405);
  const allUsers = await User.findOne({ username: "admin" });
  if (allUsers.password !== data.password0)
    return setResponse(res, "Current password in wrong", null);
  await User.updateOne(
    { username: data.username },
    { $set: { password: data.password1 } }
  );
  return setResponse(res, "Password Updated", null);
});

module.exports = route;
