const consultasRouter = require("express").Router();
const pg = require("../database");

consultasRouter.get("/", (req, res) => {
    const query = `
    SELECT
        usuario.id_usuario as id,
        usuario.username,
        departamentos.dpto_cnmbr as departamento,
        municipios.mpio_cnmbr as municipio,
        paramos.nombre as paramo,
        CONCAT( ST_YMin(paramos.geom), ', ', ST_XMin(paramos.geom)) AS coordenadas
    FROM
        usuario
    INNER JOIN
        departamentos
    ON
        usuario.fk_departamento = departamentos.gid
    INNER JOIN
        municipios
    ON
        usuario.fk_municipio = municipios.gid
    INNER JOIN
        paramos
    ON
        usuario.fk_paramo = paramos.gid  
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
  

module.exports = consultasRouter;
