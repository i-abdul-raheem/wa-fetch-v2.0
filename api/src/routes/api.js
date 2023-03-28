const route = require("express").Router();
const { Api } = require("../model/model");

const setResponse = (res, message = null, data = null, status = 200) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

route.get("/", async (req, res) => {
  const apis = await Api.find({});
  return setResponse(res, null, apis, 200);
});

route.get("/:id", async (req, res) => {
  const id = req.params.id;
  const apis = await Api.findOne({ _id: id });

  if (apis) return setResponse(res, null, apis, 200);
  return setResponse(res, "API not found", null, 404);
});

route.post("/", async (req, res) => {
  const data = req.body;
  if (!data.url) {
    return setResponse(res, "API URL is required", null, 405);
  }
  const apiExist = await Api.findOne({ url: data.url });
  if (apiExist) return setResponse(res, "API URL already exist", null, 405);
  const newApi = new Api(data);
  const result = await newApi.save();
  if (result) return setResponse(res, "New API added", result, 201);
  return setResponse(res, "Error", result, 405);
});

route.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const apiFound = await Api.findOne({ _id: id });
  if (apiFound) {
    const result = await Api.deleteOne({ _id: id });
    // console.log(result);
    if (result) return setResponse(res, "API deleted", null, 200);
    return setResponse(res, "Error while deleting api", null, 405);
  }
  return setResponse(res, "API not found", null, 404);
});

module.exports = route;
