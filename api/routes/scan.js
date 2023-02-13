// route.get("/all", async (req, res) => {
//   const response = await Phone.find({});
//   res.send(response);
// });

// route.post("/all", async (req, res) => {
//   if (!req.body.fileName) {
//     return res.send("Invalid Format");
//   }
//
//   const response = await Phone.find({ fileName: req.body.fileName });
//   const data = response;
//   data.filter((i) => i.fileName != req.body.fileName);
//   res.send(data);
// });

// module.exports = route;

const route = require("express").Router();
const fs = require("fs"); // Import File system modules
const axios = require("axios"); // Import Axios
const { Phone } = require("../model/model");

route.post("/open/:file", async (req, res) => {
  try {
    const filePath = `./${req.params.file}`;
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    const newData = data.split("\r\n");
    newData.map((i, index) => {
      newData[index] = (req.body.code.toString() + i.toString()).toString();
    });
    const response = await Phone.find({ fileName: req.params.file });
    const filterData = response;

    const searchData = [];
    for (let i = 0; i < newData.length; i++) {
      let myFoundNumber = false;
      for (let j = 0; j < filterData.length; j++) {
        if (newData[i] == filterData[j].phoneNumber) {
          myFoundNumber = true;
          break;
        }
      }
      if (!myFoundNumber) searchData.push(newData[i]);
    }
    res.status(200).send({ message: searchData, code: 200 });
  } catch {
    res.status(500).send({ message: "Internal Server Error", code: 500 });
  }
});

route.post("/scan", async (req, res) => {
  try {
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
      const newPhone = new Phone(data);
      await newPhone.save();

      res.status(200).send({ message: "Saved", code: 200 });
    } catch {
      res.status(200).send({
        message: `Error: ${req.body.phone} not found. Try again!`,
        code: 405,
      });
    }
  } catch {
    res.status(500).send({ message: "Internal Server Error", code: 500 });
  }
});

route.get("/export/:fileName", async (req, res) => {
  try {
    const response = await Phone.find({ fileName: req.params.fileName });
    const date = new Date();
    const data = response;
    let str = "";
    data.map((i) => {
      str += `${i.phoneNumber},${i.isActive}\n`;
    });
    const fileDownload = `export-${date.getDate()}-${date.getFullYear()}-${date.getMonth()}-${date.getTime()}${
      req.params.fileName
    }`;
    var createStream = fs.createWriteStream(fileDownload);
    createStream.end();
    var writeStream = fs.createWriteStream(fileDownload);
    await writeStream.write(str);
    await writeStream.end();
    res.send("Done");
  } catch {
    res.status(500).send({ message: "Internal Server Error", code: 500 });
  }
});

module.exports = route;
