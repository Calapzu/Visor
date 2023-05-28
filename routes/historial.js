const consultasRouter = require("express").Router();
const pg = require("../database");

consultasRouter.get("/", (req, res) => {
  const query = `
    SELECT
      usuario.id_usuario as id,
      usuario.username,
      join_table.dpto_cnmbr as departamento,
      join_table.mpio_cnmbr as municipio,
      join_table.nombre as paramo,
      CONCAT( ST_YMin(join_table.geom), ', ', ST_XMin(join_table.geom)) AS coordenadas
    FROM
      usuario
    INNER JOIN
      join_table
    ON
      usuario.fk_join = join_table.gid
  ;`;

  pg.query(query, (err, rows, fields) => {
    if (!err) {
      // console.log(rows);
      const results = rows.rows;
      res.json(results);
    } else {
      console.log(err);
    }
  });
});

consultasRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = `
      DELETE FROM usuario WHERE id_usuario = \$1;
    `;
  pg.query(query, [id], (err, result) => {
    if (!err) {
      console.log(`Registro con ID ${id} eliminado`);
      res.sendStatus(204); // Respuesta sin contenido
    } else {
      console.log(err);
      res.sendStatus(500); // Error del servidor
    }
  });
});

consultasRouter.post("/", (req, res) => {
  const { id_usuario, username, fk_join } = req.body;

  const getMaxIDQuery = "SELECT MAX(id_usuario) AS lastID FROM usuario";
  pg.query(getMaxIDQuery, (error, results) => {
    if (!error) {
      const lastID = results.rows[0].lastid;
      const newID = lastID ? lastID + 1 : 1;

      const insertQuery = `
      INSERT INTO usuario (
        id_usuario,
        username,
        fk_join
      ) VALUES (\$1, \$2, \$3)
    `;
    
      const insertParams = [newID, username, fk_join];
      pg.query(insertQuery, insertParams, (error, results) => {
        if (!error) {
          console.log(
            `Registro insertado con id ${newID}, username ${username} y fk_join ${fk_join}`
          );
          res.sendStatus(204); // Respuesta sin contenido
        } else {
          console.log(error);
          res.status(500).json({ msg: "Error en la Base de Datos" });
        }
      });
    } else {
      console.log(error);
      res.status(500).json({ msg: "Error de servidor" });
    }
  });
});

module.exports = consultasRouter;
