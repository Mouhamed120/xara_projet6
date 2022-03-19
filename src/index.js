const express = require("express");
const bodyparser = require("body-parser");
const api = require("./api");

const app = express();
const port = 3000;

app.use(bodyparser.json());
// définition de l'uri
app.use("/api/v1", api);

app.listen(port, () => console.log("App listening on port " + port));
