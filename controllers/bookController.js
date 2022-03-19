const Book = require("../models/Books");

// afficher les books
exports.getBooks = async (req, res) => {
  const qt = req.query.qt;
  let book;
  if (qt) {
    // d'afficher la liste des livres en fin de Stock(s'il reste 3 ou moins
    book = await Book.find({
      quantite: { $lt: 3 },
    });
  } else {
    // Afficher tous les livres
    book = await Book.find();
  }
  res.json(book);
};

// afficher un book
exports.getBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
};

// créer un book
exports.createBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
};

// modifier un book
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    Object.assign(book, req.body);
    res.send({ book });
  } catch (error) {
    res.status(401).send({ message: "Impossible" });
  }
};
// supprimer un book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    res.send({ book });
  } catch (error) {
    res.status(404).send({ message: "Book not found" });
  }
};
