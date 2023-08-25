const express = require('express')
var db = require("../db")
const app = express.Router()

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//-------------------------------------------------------------------
app.get("/api/periodos", (req, res, next) => {
    var sql = "select * from periodo"
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
app.get("/api/periodos/:id_periodo", (req, res, next) => {
    var sql = "select * from periodo where id_periodo = ?"
    var params = [req.params.id_periodo]
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
app.use((req,res,next)=>{
    if(req.query.login ==='docente'){
        next()
    }else{
        res.send('acceso no autorizado');
    }
    
})

/*   funcion ya no necesaria ya que se realiza el post desde ciclos post
app.post("/api/periodos/", (req, res, next) => {
    var errors=[]
    if (!req.body.id_alumno){
        errors.push("Id alumno no especificado");
    }/*
    if (!req.body.actividad_1){
        errors.push("No actividad 1 especificada");
    }
    if (!req.body.actividad_2){
        errors.push("No actividad 2  especificada");
    }
    if (!req.body.promedio){
        errors.push("No nota promedio especificada");
    }
    if (!req.body.id_materia){
        errors.push("No materia especificada");
    }
    if (!req.body.comentario){
        errors.push("comentario no agregado");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        comentario: req.body.comentario,
        parcial: req.body.parcial,
        actividad1:req.body.actividad1,
        actividad2:req.body.actividad2,
        promedio: req.body.promedio,
        id_alumno: req.body.id_alumno,
    }
    var sql ='INSERT INTO periodo (comentario,parcial,actividad1,actividad2,promedio,id_alumno) VALUES (?,?,?,?,?,?)'
    var params =[data.comentario, data.parcial,data.actividad1,data.actividad2,data.promedio,data.id_alumno]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})
*/
app.put("/api/periodos/:id_periodo", (req, res, next) => {
    var data = {
        comentario: req.body.comentario,
        parcial: req.body.parcial,
        actividad1:req.body.actividad1,
        actividad2:req.body.actividad2,
        promedio: req.body.promedio,
        id_alumno: req.body.id_alumno,
    }
    db.run(
        `UPDATE periodo set 
           comentario = COALESCE(?,comentario), 
           parcial = COALESCE(?,parcial), 
           actividad1 = COALESCE(?,actividad1), 
           actividad2 = COALESCE(?,actividad2), 
           promedio = COALESCE(?,promedio), 
           id_alumno = COALESCE(?,id_alumno)
           WHERE id_periodo = ?`,
        [data.comentario, data.parcial,data.actividad1,data.actividad2,data.promedio,data.id_alumno,req.params.id_periodo],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                console.log(err)
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})

app.delete("/api/periodos/:id_periodo", (req, res, next) => {
    db.run(
        'DELETE FROM periodo WHERE id_periodo = ?',
        req.params.id_periodo,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})


module.exports = app