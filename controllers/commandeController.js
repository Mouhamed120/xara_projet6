const mongoose = require("mongoose");
const Commande = require("../models/Commande");
const Book = require("../models/Books");

// create a commande
exports.createCommand = async (req, res) => {
  try {
    const newCommand = new Commande(req.body);
    await newCommand.save();
    res.status(201).json({ message: "La commande a été bien crée" });
  } catch (error) {}
};

// Afficher toutes les commandes
exports.getCommands = async (req, res) => {
  try {
    const command = await Commande.find();
    res.status(201).json(command);
  } catch (error) {}
};
// Afficher une commande pour pouvoir le valider
exports.getCommand = async (req, res) => {
  const command = await Commande.findById(req.params.id);
  let qtcommande = command.qteCom;
  let articleCommande = command.name;
  const book = await Book.findOne({ name: articleCommande });
  if (book) {
    const qteStock = book.quantite;
    if (qtcommande > qteStock) {
      res.send({
        message: "La quantite en stock est plus petit que la quantite demande",
      });
    } else {
      await Commande.findById(req.params.id).updateOne({
        $set: { status: "commande validée" },
      });
      const book = await Book.findOne({ name: articleCommande }).updateOne({
        $set: { quantite: qteStock - qtcommande },
      });

      res.send({ massage: "ok" });
    }
  } else {
    res.send({ massage: "Book is not found" });
  }
};
