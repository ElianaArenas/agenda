const { createConnection } = require('./connection');

//Se crea la conexión inicial
const connection = createConnection('');

const initDB = async ()=>{
  try {
    await connection.query(`CREATE DATABASE  IF NOT EXISTS agenda;`);
    await connection.query(`USE agenda;`);
    await connection.query(`CREATE TABLE IF NOT EXISTS la_agenda (
      id int NOT NULL AUTO_INCREMENT,
      nombre CHAR(35) NOT NULL,
      correo CHAR(35),
      tlf_fijo CHAR(10),
      tlf_movil CHAR(10),
      PRIMARY KEY(id)
      );`);
      await connection.query(`INSERT INTO la_agenda (nombre, correo, tlf_fijo, tlf_movil)
       VALUES ('Maria Daniela', 'daniela@gmail.com', '1234567', '3456788');`);
      await connection.query(`INSERT INTO la_agenda (nombre, correo, tlf_fijo, tlf_movil)
       VALUES ('Juan', 'juan@gmail.com', '31245566', '5667788');`);
      await connection.query(`INSERT INTO la_agenda (nombre, correo, tlf_fijo, tlf_movil)
       VALUES ('Luis', 'luis@gmail.com', '13234555', '4356778');`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { initDB };