const express = require("express");

const router = express.Router();

router.get("/admin", async (req, res) => {
  try {
    res.send("Coucou le backoffice");
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
});

// -------------------- READ ALL --------------------
module.exports = router;
