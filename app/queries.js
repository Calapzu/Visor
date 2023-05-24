const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'proyecto',
    password: 'admin',
    port: 5432,
})

function createUser()  {
    const valores = window.location.search;

    //Creamos la instancia
    const urlParams = new URLSearchParams(valores);
    function separarPalabras(frase) {
        return frase.split('***');
    }
    //Accedemos a los valores
    var params = separarPalabras(urlParams.get('var1'));
    // var coor = params[2].split(',');
    
    pool.query("INSERT INTO usuario (nombre, busqueda) VALUES ('1', '2') ", (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID:`)
    })
};