const express = require('express')
var db = require("../db")
const app = express.Router()

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/materias", (req, res, next) => {
    var sql = "select materia.id_materia, materia.nombre,docente.nombre as docente ,docente.apellido from materia join docente on materia.id_docente = docente.id_docente"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});
app.get("/api/materias/:id_materia", (req, res, next) => {
    var sql = "select materia.id_materia,materia.nombre,docente.nombre,docente.apellido from materia join docente on materia.id_docente = docente.id_docente where id_materia = ?"
    var params = [req.params.id_materia]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});


module.exports = app