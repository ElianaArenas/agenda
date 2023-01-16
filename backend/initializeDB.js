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
  } catch (error) {
    console.log(error);
  }
};

module.exports = { initDB };