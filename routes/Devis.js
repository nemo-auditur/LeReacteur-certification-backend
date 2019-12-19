require("dotenv").config();
const express = require("express");
const router = express.Router();
const mailgun = require("mailgun-js");

//MongoDB Model
const Devis = require("../models/Devis");

// MailGun setup
const mg = mailgun({ apiKey: process.env.API_KEY, domain: process.env.DOMAIN });
const data = {
  from: "Mailgun Sandbox <postmaster@" + process.env.DOMAIN + ">",
  to: "clement.legal.pro@gmail.com",
  subject: "Hello ",
  text: "Mes mails sur mon site internet fonctionnent"
};

// -------------------------- CREATE --------------------------

router.post("/devisvalide", async (req, res) => {
  try {
    // MongoDB create new Devis
    const newDevis = new Devis(req.body);

    await newDevis.save();
    let messageOK = { _id: newDevis._id, message: "Devis Created" };
    mg.messages().send(data, function(error, body) {});
    res.json(messageOK);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
});

// -------------------------- READ ALL --------------------------
router.get("/admintoggle", async (req, res) => {
  try {
    // MongoDB create new Devis
    const devis = await Devis.find();
    res.json(devis);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
});

// -------------------------- READ BY ID --------------------------
router.get("/admintoggle/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const devisToRead = await Devis.findById(id);
    if (devisToRead) {
      res.json(devisToRead);
    } else {
      res.status(400).json({ message: "Devis not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
});

// -------------------------- DELETE ONE --------------------------

router.get("/admintoggle/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const devisToDelete = await Devis.findById(id);

    if (devisToDelete) {
      await devisToDelete.remove();
      res.json({ devisdeleted: "Devis deleted" });
    } else {
      res.status(400).json({ message: "Devis not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
});

module.exports = router;
