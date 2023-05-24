const consultasRouter = require("express").Router();
const pg = require("../database");

consultasRouter.get("/", (req, res) => {

    const query =  `
    SELECT 
        * 
    FROM 
        "Usuario";`;
    
    pg.query(query, (err, rows, fields) => {
        if(!err) {
            console.log(rows);
            res.json({msg: rows});
        } else {
            console.log(err);
        }
    });
});

module.exports = consultasRouter;