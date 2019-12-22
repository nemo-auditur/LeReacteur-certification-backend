require("dotenv").config();
//main imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const port_number = server.listen(process.env.PORT || 3000);

//declare app
const app = express();
app.use(bodyParser.json());
app.use(cors());

//connect to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// import mongoDB model
require("./models/Devis");

//loading Routes
const backofficeRoutes = require("./routes/backOffice");
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

app.listen(port_number, () => {
  console.log("Server Started");
});
