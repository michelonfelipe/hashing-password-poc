const express = require("express");
const bodyParser = require('body-parser')
const db = require('./database');
const creationTechniques = require('./creationTechniques');

const app = express();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get("/", (_, res) => {
  res.send("Hello there!");
});

app.post("/plain", (req, res) => {
  console.log('Got body:', req.body);
    creationTechniques.plain(req.body)
    .then(person => {
      res.status(200).send(JSON.stringify(person));
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err));
    });
});

app.delete("/:id", (req, res) => {
  db.User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err));
    });
});

app.listen(3000);
