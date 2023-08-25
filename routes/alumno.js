const express = require('express')
var db = require("../db")
const app = express.Router()

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/alumnos/", (req, res, next) => {
 // var sql = "SELECT alumno.id_alumno, alumno.nombre,alumno.apellido,alumno.telefono,alumno.carnet,alumno.password, periodo.actividad1,periodo.comentario,periodo.promedio,periodo.parcial,periodo.actividad2 FROM alumno  left JOIN periodo ON alumno.id_alumno = periodo.id_alumno join ciclos on periodo.id_periodo = ciclos.id_periodo1 OR periodo.id_periodo = ciclos.id_periodo2 OR periodo.id_periodo = ciclos.id_periodo3  AND ciclos.id_ciclos = ? ";
/* var sql = `select alumno.id_alumno, alumno.nombre,alumno.apellido
            ,alumno.telefono,alumno.carnet,alumno.password, periodo.actividad1
            ,periodo.comentario,periodo.promedio,periodo.parcial,periodo.actividad2 
            from alumno left join periodo on alumno.id_alumno = periodo.id_alumno`
*/
    var sql = `select alumno.id_alumno, alumno.nombre,alumno.apellido
    ,alumno.telefono,alumno.carnet,alumno.password, periodo.actividad1
    ,periodo.comentario,periodo.promedio,periodo.parcial,periodo.actividad2, ciclos.id_ciclos,
    ciclos.promedio_ciclo
    from alumno left join periodo on alumno.id_alumno = periodo.id_alumno left join ciclos on
    periodo.id_periodo = ciclos.id_periodo1 or periodo.id_periodo = ciclos.id_periodo2 or
    periodo.id_periodo = ciclos.id_periodo3 `
    var params = []

    db.all(sql, params, (err, rows) => {
      if (err) {
          res.status(400).json({"error": err.message});
          console.log(err);
          return;
      }

      const alumnos = {}; //formato del json
      
      rows.forEach(row => {
          if (!alumnos[row.id_alumno]) {
              alumnos[row.id_alumno] = {
                  id_alumno: row.id_alumno,
                  nombre: row.nombre,
                  apellido: row.apellido,
                  telefono:row.telefono,
                  carnet: row.carnet,
                  cicloID: row.id_ciclo,
                  periodoCiclo: row.promedio_ciclo,
                  periodos: []
              };
          }

          const periodo = {  // Crear una nueva instancia de periodo en cada iteración si no hay datos queda null
            comentario: row.comentario,
            promedio: row.promedio,
            parcial: row.parcial,
            actividad1: row.actividad1,
            actividad2: row.actividad2
        };

        alumnos[row.id_alumno].periodos.push(periodo);
          
      });

      const result = Object.values(alumnos);

      res.json({
          "message": "success",
          "data": result
      });
  });
});


app.get("/api/alumnos/:carnet/:id_ciclos", (req, res, next) => {
    var sql = `select alumno.id_alumno, alumno.nombre,alumno.apellido
    ,alumno.telefono,alumno.carnet,alumno.password, periodo.actividad1
    ,periodo.comentario,periodo.promedio,periodo.parcial,periodo.actividad2, ciclos.id_ciclos,
  ciclos.promedio_ciclo
    from alumno left join periodo on alumno.id_alumno = periodo.id_alumno left join ciclos on
    periodo.id_periodo = ciclos.id_periodo1 or periodo.id_periodo = ciclos.id_periodo2 or
    periodo.id_periodo = ciclos.id_periodo3 where ciclos.id_ciclos =? and alumno.carnet = ?`
   
    var params = [req.params.id_ciclos,req.params.carnet]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            console.log(err);
            return;
        }
  
        const alumnos = {};
        
        rows.forEach(row => {
            if (!alumnos[row.id_alumno]) {
                alumnos[row.id_alumno] = {
                    id_alumno: row.id_alumno,
                    nombre: row.nombre,
                    apellido: row.apellido,
                    telefono:row.telefono,
                    carnet: row.carnet,
                    cicloID: row.id_ciclo,
                    periodoCiclo: row.promedio_ciclo,
                    periodos: []
                };
            }
  
            const periodo = {  // Crear una nueva instancia de periodo en cada iteración
              comentario: row.comentario,
              promedio: row.promedio,
              parcial: row.parcial,
              actividad1: row.actividad1,
              actividad2: row.actividad2
          };
  
          alumnos[row.id_alumno].periodos.push(periodo);
            
        });
  
        const result = Object.values(alumnos);
  
        res.json({
            "message": "success",
            "data": result
        });
      });
});

app.get("/api/alumnos/:carnet", (req, res, next) => {
    var sql = "select * from alumno where carnet = ?"
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

