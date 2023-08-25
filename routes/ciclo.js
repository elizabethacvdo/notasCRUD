const express = require('express')
var db = require("../db")
const app = express.Router()

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//-------------------------------------------------------------------
app.get("/api/ciclos/:id_alumno", (req, res, next) => {
    var sql = `select * from ciclos right join periodo on ciclos.id_periodo1 = periodo.id_periodo or
    ciclos.id_periodo2 = periodo.id_periodo or ciclos.id_periodo3 = periodo.id_periodo join alumno on
    periodo.id_alumno = alumno.id_alumno where alumno.id_alumno=?`
    var params = [req.params.id_alumno]
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
app.get("/api/ciclos/:id_alumno/:id_ciclo/", (req, res, next) => {
    var sql = `select * from ciclos left join periodo on ciclos.id_periodo1 = periodo.id_periodo or
    ciclos.id_periodo2 = periodo.id_periodo or ciclos.id_periodo3 = periodo.id_periodo left join alumno on
    periodo.id_alumno = alumno.id_alumno and ciclos.id_ciclos = ? where alumno.id_alumno=?`
    var params = [req.params.id_ciclo,req.params.id_alumno]
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

app.post("/api/ciclos/:id_alumno", (req, res, next) => {
    var errors=[]
    var id1,id2,id3;
    if (!req.body.id_materia){
        errors.push("Id materia no especificado");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        promedio_ciclo: req.body.promedio_ciclo,
        id_periodo1: req.body.id_periodo1,
        id_periodo2:req.body.id_periodo2,
        id_periodo3:req.body.id_periodo3,
        id_materia: req.body.id_materia
        
    }
    

    var insert = 'INSERT INTO periodo (comentario,promedio,parcial,actividad1,actividad2,id_alumno) VALUES (?,?,?,?,?,?)'
    var parametros = ["",0,0,0,0,req.params.id_alumno]
    db.run(insert,parametros,function (err, result) {
        if (err){
            console.log(err)
            return;
        }
        id1 = this.lastID;
       
        });
        var insert = 'INSERT INTO periodo (comentario,promedio,parcial,actividad1,actividad2,id_alumno) VALUES (?,?,?,?,?,?)'
        var parametros = ["",0,0,0,0,req.params.id_alumno]
        db.run(insert,parametros,function (err, result) {
            if (err){
                console.log(err)
                return;
            }
            id2 = this.lastID;
            
            });
            var insert = 'INSERT INTO periodo (comentario,promedio,parcial,actividad1,actividad2,id_alumno) VALUES (?,?,?,?,?,?)'
    var parametros = ["",0,0,0,0,req.params.id_alumno]
    db.run(insert,parametros,function (err, result) {
                if (err){
                    console.log(err)
                    return;
                }
                id3 = this.lastID;
                var sql = 'INSERT INTO ciclos (promedio_ciclo,id_periodo1,id_periodo2,id_periodo3,id_materia) VALUES (?,?,?,?,?)'
                var params =[0,id1,id2,id3,data.id_materia]
                
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
                });
    
})

app.put("/api/ciclos/:id_ciclo", (req, res, next) => {
    var data = {
        promedio_ciclo: req.body.promedio_ciclo,
        id_periodo1: req.body.id_periodo1,
        id_periodo2:req.body.id_periodo2,
        id_periodo3:req.body.id_periodo3,
        id_materia: req.body.id_materia
        
    }
    db.run(
        `UPDATE ciclos set 
           
        promedio_ciclo = COALESCE(?,promedio_ciclo) 
           
           WHERE id_ciclos = ?`,
        [data.promedio_ciclor,req.params.id_ciclo],
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

app.delete("/api/ciclos/:id_ciclo", (req, res, next) => {
    db.run(
        'DELETE FROM ciclos WHERE id_ciclos = ?',
        req.params.id_ciclo,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})


module.exports = app