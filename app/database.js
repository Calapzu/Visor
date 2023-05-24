const { Pool } = require('pg');

const pgpool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'proyecto',
    password: 'admin',
    port: 5432,
});

pgpool.connect(function (err) {
    if (err) {
        console.log(err);
        return;
    }else {
        console.log("DB Conectada");
    }
});

module.exports = pgpool;

