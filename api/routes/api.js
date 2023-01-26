const route = require("express").Router();

const apis = [
  {
    id: "1",
    url: "https://watverifyapi.live/verify?api_key=API-X-29442328030320198524098206&phones=",
  },
];

const setResponse = (res, message = null, data = null, status = 200) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

route.get("/", (req, res) => {
  return setResponse(res, null, apis, 200);
});

route.get("/:id", (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < apis.length; i++) {
    if (apis[i].id === id) {
      return setResponse(res, null, apis[i], 200);
    }
  }
  return setResponse(res, "API not found", null, 404);
});

route.post("/", (req, res) => {
  const data = req.body;
  if (!data.url) {
    return setResponse(res, "API URL is required", null, 405);
  }
  let apiFound = false;
  for (let i = 0; i < apis.length; i++) {
    if (apis[i].url === data.url) {
      apiFound = true;
      break;
    }
  }
  if (apiFound) return setResponse(res, "API already exist", null, 401);
  try {
    apis.push({
      id: (parseInt(apis[apis.length - 1].id) + 1).toString(),
      url: data.url,
    });
  } catch (ex) {
    apis.push({
      id: 1,
      url: data.url,
    });
  }
  return setResponse(res, "New API added", data, 201);
});

route.delete("/:id", (req, res) => {
  const id = req.params.id;
  let apiFound = false;
  let indexOfAPI = -1;
  for (let i = 0; i < apis.length; i++) {
    if (apis[i].id === id) {
      apiFound = true;
      indexOfAPI = i;
      break;
    }
  }
  if (!apiFound) return setResponse(res, "API not found", null, 404);
  apis.splice(indexOfAPI, 1);
  return setResponse(res, "API deleted", null, 200);
});

module.exports = route;
