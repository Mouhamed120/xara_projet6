const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
  {
    auteur: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    date: { type: Date, required: true },
    cat: { type: Array, required: true },
    publishing: { type: String, required: true },
    quantite: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
