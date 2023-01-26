const route = require("express").Router();
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/authorization");

const users = [
  {
    username: "admin",
    password: "12345678",
  },
];

const setResponse = (res, message = null, data = null, status = 200) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

route.post("/", (req, res) => {
  const data = req.body;
  if (!data.username) {
    return setResponse(res, "Username is required", null, 405);
  }
  if (!data.password) {
    return setResponse(res, "Password is required", null, 405);
  }
  let userFound = false;
  let indexOfUser = -1;
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].username === data.username &&
      users[i].password === data.password
    ) {
      userFound = true;
      indexOfUser = i;
      break;
    }
  }
  if (!userFound)
    return setResponse(res, "Username/Password not correct", null, 404);
  const token = jwt.sign(
    { username: users[indexOfUser].username },
    process.env.REACT_APP_SECRET,
    { expiresIn: "86400s" }
  );
  return setResponse(res, "Login Successful", {
    token,
    username: users[indexOfUser].username,
  });
});

route.put("/", auth, (req, res) => {
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
  let userFound = false;
  let indexOfUser = -1;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === data.username) {
      userFound = true;
      indexOfUser = i;
      break;
    }
  }
  if (!userFound) return setResponse(res, "User not found!", null, 404);
  if (users[indexOfUser].password != data.password0)
    return setResponse(res, "Current password is invalid", null, 405);
  users[indexOfUser].password = data.password1;
  return setResponse(res, "Password Updated", null);
});

module.exports = route;
