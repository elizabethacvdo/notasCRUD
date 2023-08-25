const express = require('express');
const periodoRoute  = require('./routes/periodo');
const docenteRoute  = require('./routes/docente');
const alumnosRoute  = require('./routes/alumno');
const materiaRoute  = require('./routes/materia');
const cicloRoute  = require('./routes/ciclo');
const app = express();

 

//-----------------------settings

app.set('appName','proyectoBD');

//--------------------------------


app.use(express.json());

//solo tienen get y get/id--------------

app.use(docenteRoute)  //http://localhost:3000/api/docentes/
app.use(materiaRoute)  //http://localhost:3000/api/materias/                    --datos materia incluido docente encargado

app.use(alumnosRoute)  //http://localhost:3000/api/alumnos/                     --envia datos de los alumnos mas los datos de notas de cada periodo
                       ////http://localhost:3000/api/alumnos/id_alumno/id_ciclo   --datos de alumno del ciclo actual que se encuentra cursando 
                                            ///api/alumnos/:id_alumno               --datos solo del alumno
//---------------------------------------
app.use(cicloRoute) 
/*endpoints ciclos
//   /api/ciclos/:id_alumno             ver ciclos por alumno  
    /api/ciclos/:id_alumno/:id_ciclo/  ciclo actual del alumno 
    /api/ciclos/:id_alumno              --POST  EJE{"id":1}  despues se pueden agregar los periodos opcionales
    /api/ciclos/:id_ciclo               --PUT    
    /api/ciclos/:id_ciclo               --DELETE

*/ 
app.use(periodoRoute)
/*
endpoints de notas
http://localhost:3000/api/periodos/            GET
http://localhost:3000/api/periodos/:id_nota    GET ID
http://localhost:3000/api/periodos/:id_nota/?login=docente    PUT    sino es agregado acceso no autorizado 
http://localhost:3000/api/periodos/:id_nota/?login=docente    DELETE
*/

app.listen(3000);
console.log(`server ${app.get('appName')} on port ${3000}`)