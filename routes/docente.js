const express = require('express')
var db = require("../db")
const app = express.Router()

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/docentes", (req, res, next) => {
    var sql = "select * from docente"
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
app.get("/api/docentes/:carnet", (req, res, next) => {
    var sql = "select * from docente where carnet = ?"
    var params = [req.params.carnet]
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