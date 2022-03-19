const mongoose = require("mongoose");
const commandSchema = new mongoose.Schema(
  {
    dateCom: { type: Date },
    name: { type: String },
    qteCom: { type: Number },
    client: {
      prenom: { type: String },
      nom: { type: String },
      adresse: { type: String },
    },
    status: { type: String, default: "Non validé" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Commande", commandSchema);
