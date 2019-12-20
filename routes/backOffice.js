const express = require("express");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const router = express.Router();

const Admin = require("../models/Admin");

// -------------------------- CREATE --------------------------

router.post("/createAdmin", async (req, res) => {
  const token = uid2(64);
  const salt = uid2(64);
  const hash = SHA256(req.body.password + salt).toString(encBase64);

  try {
    // MongoDB create new Devis
    const newAdmin = new Admin({
      email: req.body.email,
      token: token,
      salt: salt,
      hash: hash
    });

    await newAdmin.save();
    let messageOK = { _id: newAdmin._id, message: "Admin Created" };
    return res.json(messageOK);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
});

router.post("/login", async (req, res) => {
  console.log("test");
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    console.log(admin);
    if (admin) {
      if (
        SHA256(req.body.password + admin.salt).toString(encBase64) ===
        admin.hash
      ) {
        return res.json({
          _id: admin._id,
          token: admin.token
        });
      } else {
        return res.status(401).json({ error: "Unauthorized" });
      }
    } else {
      return res.status(400).json("Admin not found");
    }
  } catch (e) {
    return res.status(400).json({ message: "An error occurred" });
  }
});

// -------------------- READ ALL --------------------
module.exports = router;
