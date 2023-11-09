const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { destinationData } = require("./data");
require("dotenv").config();
const port = process.env.PORT || 5000;
console.log("secret", process.env.ACCESS_TOKEN_SECRET);

const destinationListData = destinationData;

app.use(cors());
app.use(express.json());

app.post("/jwt", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.send({ token });
});
app.get("/destination/:destinationName", (req, res) => {
  const { destinationName } = req.params;
  const findData = destinationListData.find(
    (data) => data.country === destinationName
  );
  res.send({
    status: findData ? true : false,
    message: findData ? "Data find successfully!" : "Data not find!",
    data: findData,
  });
});

app.get("/", (req, res) => {
  res.send("travel agency is running");
});

app.listen(port, () => {
  console.log(`travel agency is running on port ${port}`);
});
