const route = require("express").Router();
const fs = require("fs"); // Import File system modules
const axios = require("axios"); // Import Axios
const PhoneNumber = [
  { fileName: "test.csv", isActive: true, phoneNumber: "17183141861" },
];

route.post("/scan", async (req, res) => {
  if (!req.body.phone) {
    return res
      .status(403)
      .send({ message: "Phone number is required", code: 403 });
  }
  if (!req.body.api) {
    return res.status(403).send({ message: "API is required", code: 403 });
  }
  if (!req.body.fileName) {
    return res
      .status(403)
      .send({ message: "File name is required", code: 403 });
  }
  const myPhone = req.body.phone;
  const api = req.body.api;
  try {
    const myData = await axios.get(api + myPhone).then((i) => i.data[0]);
    if (!myData.phone) {
      return res.status(403).send({ message: myData, code: 403 });
    }
    // Save number

    const data = {
      fileName: req.body.fileName,
      isActive: myData.result,
      phoneNumber: myData.phone,
    };
    console.log(data);
    PhoneNumber.push(data);

    res.status(200).send({ message: "Saved", code: 200 });
  } catch {
    res.status(200).send({
      message: `Error: ${req.body.phone} not found. Try again!`,
      code: 405,
    });
  }
});

route.post("/open/:file", async (req, res) => {
  const filePath = `./${req.params.file}`;
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  const newData = data.split("\n");
  newData.map((i, index) => {
    newData[index] = (
      req.body.code.toString() + newData[index].toString()
    ).toString();
  });

  const filterData = PhoneNumber;
  filterData.filter((i) => i.fileName != req.body.file);

  const myContinue = [];
  for (let i = 0; i < filterData.length; i++) {
    myContinue.push(filterData[i].phoneNumber);
  }
  const searchData = [];
  for (let i = 0; i < newData.length; i++) {
    let myFoundNumber = false;
    for (let j = 0; j < myContinue.length; j++) {
      if (newData[i] == myContinue[j]) {
        myFoundNumber = true;
        break;
      }
    }
    if (!myFoundNumber) searchData.push(newData[i]);
  }

  res.status(200).send({ message: searchData, code: 200 });
});

route.get("/all", async (req, res) => {
  res.send(PhoneNumber);
});

route.post("/all", async (req, res) => {
  if (!req.body.fileName) {
    return res.send("Invalid Format");
  }
  //   const response = await PhoneNumber.find({ fileName: req.body.fileName });
  const data = PhoneNumber;
  data.filter((i) => i.fileName != req.body.fileName);
  res.send(data);
});

module.exports = route;
