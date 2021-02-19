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

app.post("/plain", (req, res) => createWithTechnique('plain', req, res));
app.post("/md5", (req, res) => createWithTechnique('md5', req, res));
app.post("/sha256", (req, res) => createWithTechnique('sha256', req, res));
app.post("/salt", (req, res) => createWithTechnique('salt', req, res));
app.post("/pepper", (req, res) => createWithTechnique('pepper', req, res));

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

const createWithTechnique = (technique, req, res) => {
  creationTechniques[technique](req.body)
    .then(() => res.sendStatus(201))
    .catch(err => res.sendStatus(500))
}