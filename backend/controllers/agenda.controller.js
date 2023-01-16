const { connection } = require('../connection');

const createAgenda =  async (req, res) => {
  try {
    const { nombre, correo, tlf_fijo, tlf_movil } = req.body;
    const sql = `INSERT INTO la_agenda (nombre, correo, tlf_fijo, tlf_movil)
                 VALUES (:nombre, :correo, :tlf_fijo, :tlf_fijo);`;
    const options = {
      replacements: {
        nombre: nombre, correo: correo, tlf_fijo:tlf_fijo , tlf_movil: tlf_movil
      }
    }
  
    await connection.query(sql, options);

    res.status(200).json({ ok: true, message: 'agenda successfully created' });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}

const getAgenda = async (req, res) => {
  try {
    const { nombre } = req.params;
    const sql = `SELECT * FROM la_agenda WHERE nombre = :nombre;`;

    const options = {
      replacements: {
        nombre: nombre
      }
    }
    const [agenda]  = await connection.query(sql, options);
    res.status(200).json({ agenda });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}

const getAgendas = async (req, res)=>{
  try {
    const sql = `SELECT * FROM la_agenda;`;
    const [agendas] = await connection.query(sql);

    res.status(200).json({ agendas });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}

const updateAgenda = async (req, res) =>{
  try {
    const {id} = req.params;
    let sql = `UPDATE la_agenda SET `;

    //Agregar a la query campos a actualizar de forma dinamica. 
    for (const iterator in req.body) {
      sql += `${iterator} = :${iterator}, `;
    }

    //Se elimina los ultimos caracteres, espacio y coma.
    sql = `${sql.substring(0, sql.length - 2)} WHERE id = :id;`;
    
    const options = {
      replacements: { ...req.body, id }
    };
    const [agenda] = await connection.query(sql, options);

    res.status(200).json({ok: true, agenda });

  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}

const deleteAgenda = async (req, res) =>{
  try {
    const {id} = req.params;
    const sql = `DELETE FROM la_agenda WHERE id = :id;`;
    const options = {
      replacements: {
        id
      }
    }
    await connection.query(sql, options); 

    res.status(200).json({ ok: true, message: "agenda successfully deleted" });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}

module.exports = { createAgenda,getAgenda,getAgendas,updateAgenda,deleteAgenda }
