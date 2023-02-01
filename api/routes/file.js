const route = require("express").Router();
const { File } = require("../model/model");

const files = [
  {
    id: "1",
    title: "test.csv",
    path: "test.csv",
  },
];

const setResponse = (res, message = null, data = null, status = 200) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

route.get("/", async (req, res) => {
  const files = await File.find({});
  return setResponse(res, null, files, 200);
});

route.get("/:id", async (req, res) => {
  const id = req.params.id;
  const files = await File.find({ _id: id });
  if (!files) return setResponse(res, "File not found", null, 404);
  return setResponse(res, null, files, 404);
});

route.post("/", async (req, res) => {
  const data = req.body;
  if (!data.title) {
    return setResponse(res, "File title is required", null, 405);
  }
  if (!req.files || !req.files.file) {
    return setResponse(res, "File is required", null, 405);
  }
  const file = req.files.file;

  // Check if file name already exist
  const fileExist = await File.findOne({ title: data.title });
  if (fileExist) return setResponse(res, "File title already exist", null, 405);

  // Add file to record
  const newFile = new File({
    title: data.title + ".csv",
    path: `${data.title}.csv`,
  });

  const result = await newFile.save();

  // Move file to server storage
  if (result) {
    file.mv(`./${data.title}.csv`, (err) => {
      if (err) {
        console.log(err);
      }
    });
    return setResponse(res, "File added", null, 201);
  }
  return setResponse(res, "Error uploading file", null, 500);
});

route.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const fileFound = await File.findOne({ _id: id });
  if (fileFound) {
    const result = await File.deleteOne({ _id: id });
    // console.log(result);
    if (result) return setResponse(res, "FILE deleted", null, 200);
    return setResponse(res, "Error while deleting file", null, 405);
  }
  return setResponse(res, "FILE not found", null, 404);
});

module.exports = route;
