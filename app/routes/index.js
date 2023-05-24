const router = require("express").Router();

router.use("/consulta", require("./consultas"));

module.exports = router;