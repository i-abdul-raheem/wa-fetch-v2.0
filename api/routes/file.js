const route = require("express").Router();

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

route.get("/", (req, res) => {
  return setResponse(res, null, files, 200);
});

route.get("/:id", (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < files.length; i++) {
    if (files[i].id === id) {
      return setResponse(res, null, files[i], 200);
    }
  }
  return setResponse(res, "File not found", null, 404);
});

route.post("/", (req, res) => {
  const data = req.body;
  console.log(data);
  if (!data.title) {
    return setResponse(res, "File title is required", null, 405);
  }
  if (!req.files || !req.files.file) {
    return setResponse(res, "File is required", null, 405);
  }
  const file = req.files.file;

  // Check if file name already exist
  for (let i = 0; i < files.length; i++) {
    if (files[i].title === data.title) {
      return setResponse(res, "File title already exist", null, 405);
    }
  }

  // Add file to record
  if (files.length < 1) {
    files.push({
      id: "1",
      title: data.title + ".csv",
      path: `${data.title}.csv`,
    });
  } else {
    files.push({
      id: (parseInt(files[files.length - 1].id) + 1).toString(),
      title: data.title + ".csv",
      path: `${data.title}.csv`,
    });
  }

  // Move file to server storage
  file.mv(`./${data.title}.csv`, (err) => {
    if (err) {
      console.log(err);
      files.pop();
    }
  });

  return setResponse(res, "File added", null, 201);
});

route.delete("/:id", (req, res) => {
  const id = req.params.id;
  let fileFound = false;
  let indexOfFile = -1;
  for (let i = 0; i < files.length; i++) {
    if (files[i].id === id) {
      fileFound = true;
      indexOfFile = i;
      break;
    }
  }
  if (!fileFound) return setResponse(res, "File not found", null, 404);
  files.splice(indexOfFILE, 1);
  return setResponse(res, "File deleted", null, 200);
});

module.exports = route;
