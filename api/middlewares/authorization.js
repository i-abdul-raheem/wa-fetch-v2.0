const jwt = require("jsonwebtoken");

const setResponse = (res, message = null, data = null, status = 200) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

function authorization(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return setResponse(res, "Authorization token is required", null, 401);

  jwt.verify(token, process.env.REACT_APP_SECRET, (err, user) => {

    if (err) return setResponse(res, err, null, 403);

    req.user = user;

    next();
  });
}

module.exports = authorization;
