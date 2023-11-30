# notasCRUD
api servicio notas  de un alumno
Puntos finales (Endpoints):

//solo tienen get y get/id--------------

//http://localhost:3000/api/docentes/
//http://localhost:3000/api/materias/                    --datos materia incluido docente encargado

//http://localhost:3000/api/alumnos/                     --envia datos de los alumnos mas los datos de notas de cada periodo
////http://localhost:3000/api/alumnos/id_alumno/id_ciclo   --datos de alumno del ciclo actual que se encuentra cursando 
 ///api/alumnos/:id_alumno               --datos solo del alumno
//---------------------------------------

/*endpoints ciclos
//   /api/ciclos/:id_alumno             ver ciclos por alumno  
/api/ciclos/:id_alumno/:id_ciclo/  ciclo actual del alumno 
/api/ciclos/:id_alumno              --POST  EJE{"id":1}  despues se pueden agregar los periodos opcionales
/api/ciclos/:id_ciclo               --PUT    
/api/ciclos/:id_ciclo               --DELETE

*/ 

/*
endpoints de notas
/api/periodos/            GET
/api/periodos/:id_nota    GET ID
/api/periodos/:id_nota/?login=docente    PUT    sino es agregado acceso no autorizado 
/api/periodos/:id_nota/?login=docente    DELETE
*/
