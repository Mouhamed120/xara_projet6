const router = require("express").Router();
const controller = require("../controllers/bookController");
const commande = require("../controllers/commandeController");
const mongoose = require("mongoose");

// définition de mes middlewares

mongoose
  .connect("mongodb://localhost:27017/Books")
  .then(() => {
    // enpoint (/books) => liste des tous les livre
    router.get("/books", controller.getBooks);
    //get specific book
    router.get("/books/:id", controller.getBook);
    // create a book
    router.post("/books", controller.createBook);
    // update Book
    router.put("/books/:id", controller.updateBook);
    // delete book
    router.delete("/books/:id", controller.deleteBook);
    // Afficher toutes les commandes
    router.get("/command", commande.getCommands);
    // Afficher une commande pour la valider
    router.get("/command/:id", commande.getCommand);
    router.post("/command", commande.createCommand);
  })
  .catch((error) => {
    console.log("connexion failed");
  });

module.exports = router;
