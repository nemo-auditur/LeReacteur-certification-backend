require("dotenv").config();
const express = require("express");
const router = express.Router();
const mailgun = require("mailgun-js");

//MongoDB Model
const Devis = require("../models/Devis");

// MailGun setup
const mg = mailgun({ apiKey: process.env.API_KEY, domain: process.env.DOMAIN });

// -------------------------- CREATE --------------------------

router.post("/devisvalide", async (req, res) => {
  try {
    // MongoDB create new Devis
    const newDevis = new Devis(req.body);

    await newDevis.save();

    //send summerize mail to the user
    let messageOK = { _id: newDevis._id, message: "Devis Created" };
    mg.messages().send(
      {
        from: "Mailgun Sandbox <postmaster@" + process.env.DOMAIN + ">",
        to: newDevis.usersMailAdress,
        subject:
          "Votre demande de devis de prêt immobilier numéro" +
          newDevis._id +
          "a bien été prise en compte",
        text:
          "Bonjour," +
          "\n" +
          "Nous avons bien pris en compte votre demande." +
          "\n" +
          "Voici le récapitulatif de votre demande" +
          newDevis +
          "\n" +
          "Nous nous efforçons de revenir vers vous dans les meilleurs délais" +
          "\n" +
          "LeMeilleurTaux"
      },
      function(error, body) {}
    );
    res.json(messageOK);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
});

// -------------------------- READ ALL DEVIS --------------------------
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

// -------------------------- READ DEVIS BY ID --------------------------
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

// -------------------------- DELETE ONE DEVIS --------------------------

router.get("/admintoggle/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const devisToDelete = await Devis.findById(id);

    if (devisToDelete) {
      await devisToDelete.remove();
      res.json({ devisdeleted: "Le dossier a bien été effacé" });
    } else {
      res.status(400).json({ message: "Devis not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
});

module.exports = router;
