var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(":memory:", (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE IF NOT EXISTS docente(
            id_docente INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,      
            apellido TEXT NOT NULL, 
            telefono TEXT NOT NULL,
            carnet TEXT NOT NULL, 
            password TEXT NOT NULL
  ) 
            `,
        (err) => {
            if (err) {
                // Table already created
                console.log(err)
            }else{
                // Table just created, creating some rows

             
                var insert = 'INSERT INTO docente (nombre, apellido,telefono,carnet ,password) VALUES (?,?,?,?,?)'
                db.run(insert, ["Juan", "Ramirez", "78852565", "2020JP110D",md5("Juancito2020")])
                db.run(insert, ["Ernesto", "Quintana", "72585268", "2020ER120D",md5("Neto2020")])
                db.run(insert, ["Jose", "Perez", "79562112", "2020JQ130D",md5("Jose2020")])
                db.run(insert, ["María", "Alvarenga", "74231565", "2020MA140D",md5("Maria2020")])
                console.log('Docentes de prueba')
            }
        }); 
        db.run(`CREATE TABLE IF NOT EXISTS alumno(
            id_alumno INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,      
            apellido TEXT NOT NULL, 
            telefono TEXT NOT NULL,
            carnet TEXT NOT NULL, 
            password TEXT NOT NULL
            
            
  )
            `,
        (err) => {
            if (err) {
                // Table already created
                console.log(err)
            }else{
                // Table just created, creating some rows
/** INSERT INTO alumno VALUES (1, Javier, Jimenez, 74456996, 2023JJ110, Javi2023)""")
c.execute("""INSERT INTO alumno VALUES (2, Karla, Cruz, 79963113, 2023KC120, Karlita2023)""")
c.execute("""INSERT INTO alumno VALUES (3, Sofia, Martinez, 78123549, 2023SM130, Sofi2023)""")
c.execute("""INSERT INTO alumno VALUES (4, Diego, Castro, 72746858, 2023DC140, Diego2023)""")

                 */
                var insert = 'INSERT INTO alumno (nombre,apellido,telefono,carnet,password) VALUES (?,?,?,?,?)'
                db.run(insert, ["Javier","Cruz","74456996","2023JJ110","Javi2023"])
                db.run(insert, ["Karla","Jimenez","79963113","2023KC120","Karlita2023"])
                console.log('alumnos de prueba')
            }
        }); 
        db.run(`CREATE TABLE IF NOT EXISTS materia(
            id_materia INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,                
            id_docente INT,   
            FOREIGN KEY (id_docente) REFERENCES docente(id_docente)
  )
            `,
        (err) => {
            if (err) {
                // Table already created
                
            }else{
                // Table just created, creating some rows
                /* INSERT INTO materia VALUES (1, Funciones de Bases de Datos, 1)""")
                c.execute("""INSERT INTO materia VALUES (2, Programacion de paginas web, 2)""")
                c.execute("""INSERT INTO materia VALUES (3, Diseño de paginas web avanzadao, 3)""")
                c.execute("""INSERT INTO materia VALUES (4, Gestion de servidores Web, 4)""") */
                var insert = 'INSERT INTO materia (nombre,id_docente) VALUES (?,?)'
                db.run(insert, ["Funciones de Bases de Datos",1])
                db.run(insert, ["Programacion de paginas web",2])
                db.run(insert, ["Diseño de paginas web avanzadao",3])
                db.run(insert, ["Gestion de servidores Web",4])
                console.log('materias de prueba')
            }
        }); 
        db.run(`CREATE TABLE IF NOT EXISTS periodo(
            id_periodo INTEGER PRIMARY KEY AUTOINCREMENT,
            comentario TEXT,
            promedio DECIMAL,   
            parcial DECIMAL,
            actividad1 DECIMAL,
            actividad2 DECIMAL,
            id_alumno INT,   
            FOREIGN KEY (id_alumno) REFERENCES alumno  (id_alumno)
    )
            `,
        (err) => {
            if (err) {
                // Table already created
                console.log(err)
            }else{
                
                var insert = 'INSERT INTO periodo (comentario,promedio,parcial,actividad1,actividad2,id_alumno) VALUES (?,?,?,?,?,?)'
                db.run(insert,["Buen trabajo",9.00,8.54,9.65,9.06,1])
                db.run(insert, ["Puedes mejorar",6.00,7.20,7.50,6.9,1])
                db.run(insert,  ["Sigue asi",10,9.5,10,9.83,1])
                console.log('periodo de prueba')
            }
        }); 
        db.run(`CREATE TABLE IF NOT EXISTS ciclos(
            id_ciclos INTEGER PRIMARY KEY AUTOINCREMENT,
            promedio_ciclo DECIMAL,
            id_periodo1 INT,
            id_periodo2 INT,
            id_periodo3 INT,
            id_materia INT,
            FOREIGN KEY (id_periodo1) REFERENCES periodo (id_periodo),
            FOREIGN KEY (id_periodo2) REFERENCES periodo (id_periodo),
            FOREIGN KEY (id_periodo3) REFERENCES periodo (id_periodo),
            FOREIGN KEY (id_materia) REFERENCES materia (id_materia)
        );
        
            `,
        (err) => {
            if (err) {
                // Table already created
                console.log(err)
            }else{
               
                var insert = 'INSERT INTO ciclos (promedio_ciclo,id_periodo1,id_periodo2,id_periodo3,id_materia) VALUES (?,?,?,?,?)'
                db.run(insert, [9.00,1,2,3,1])
                console.log('ciclo de prueba')
            }
        });
       
    }//aqui termina la creacion de la base
});


module.exports = db
