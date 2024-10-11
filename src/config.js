const { createPool } = require("mysql2/promise");

// Configura la conexión a MySQL
const pool = createPool({
    host: 'localhost', // Tu host
    user: 'root',      // Tu usuario de MySQL
    password: '',      // Tu contraseña de MySQL
    database: 'simple_login' // Tu base de datos
});

console.log("DB is Connected....[OK]");

// Exporta el pool para que se pueda usar en otros archivos
module.exports = { pool };