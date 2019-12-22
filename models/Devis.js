const mongoose = require("mongoose");

const Devis = mongoose.model("Devis", {
  usersMailAdress: { type: String },
  emailCheckIn: { type: String },
  typeOfProperty: { type: String },
  conditionOfProperty: { type: String },
  useOfProperty: { type: String },
  actualSituationOfOwner: { type: String },
  addressOfProperty: {
    country: { type: String },
    cityOrZipCode: { type: String }
  },
  amountOfProject: {
    estimateAmountOfAcquisition: { type: Number },
    estimateAmountOfWorks: { type: Number },
    notaryFees: { type: Number },
    totalBudget: { type: Number }
  }
});

module.exports = Devis;
