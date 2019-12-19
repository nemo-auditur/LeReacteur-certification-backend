require("dotenv").config();
//main imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

//declare app
const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// import mongoDB model
require("./models/Devis");

//loading Routes
const backofficeRoutes = require("./routes/backoffice");
const Devis = require("./routes/Devis");
//Use routes
app.use(backofficeRoutes);
app.use(Devis);

//Test Route
app.get("/", async (req, res) => {
  try {
    res.json({ message: "hello le simulateur" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
});

app.listen(8000, () => {
  console.log("Server Started");
});
