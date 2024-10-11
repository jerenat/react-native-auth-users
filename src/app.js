const express = require('express');
const cors = require("cors");

const { pool } = require('./config.js');

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false })); // Middleware para parsear datos urlencoded (formularios).
app.use(express.json()); // Middleware para parsear datos JSON.


// -- Middlewares

// -- GET: Index
app.get("/", (req, res) => {
    res.send("All ok!")
})



// -- POST: Register
app.post("/register", async (req, res) => {

    const { username, email, password } = req.body;
    console.log(req.body)

    try {
        const [createUser] = await pool.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, password]
        );

        if (createUser.affectedRows > 0) {


            console.log("OKK")

            res.status(200).json({ status: "ok", msg: "All ok!" });

        } else {
            res.status(400).json({ error: true, msg: "Error al crear el usuario" });
        }
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ error: true, msg: "Error del servidor" });
    }

})


// -- POST: Login
const getUserByUsername = async username => {
    try {
        const [getUser] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);

        if (getUser.length > 0) {

            const id = getUser[0].iduser

            return id.toString();
        } else {
            return 0;
        }


    } catch (e) {
        return e;
    }
}

app.post("/login", async (req, res) => {

    const { username, password } = req.body;

    console.log(req.body)

    // Validar que username y password están presentes
    if (!username || !password) {
        return res.status(400).json({ error: true, msg: "Username y password son requeridos" });
    }

    try {
        // Buscar al usuario por nombre y contraseña (texto plano)
        const [rows] = await pool.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);

        // Si no se encontró el usuario
        if (rows.length === 0) {
            return res.status(404).json({ error: true, msg: "Usuario no encontrado o contraseña incorrecta" });
        }


        // -- extrae los datos del usuario
        const token = await getUserByUsername(username);

        // Si el usuario y la contraseña son correctos
        return res.status(200).json(token);

    } catch (error) {
        console.error('Error en el login:', error);
        return res.status(500).json({ error: true, msg: "Error del servidor" });
    }
});


// -- POST: Check-session:
// Ruta en tu servidor para verificar el token de sesión
app.post('/check-session', async (req, res) => {

    console.log(req.body)
    const { token } = req.body;

    // Aquí puedes verificar el token en la base de datos
    const [getIdUser] = await pool.query("SELECT * FROM users WHERE iduser = ?", [token]);

    if(getIdUser.length > 0){
        return res.status(200).json({iduser: getIdUser[0].iduser, username: getIdUser[0].username});
    }else{
        return res.status(500).json({msg: 'Server Error on /check-session'})
    }
});


app.get("/users", async (req, res) => {

    const [getUsers] = await pool.query("SELECT * FROM users");
    if (getUsers.length > 0) {

        return res.json(getUsers)
    } else {
        return res.json({ error: true, msg: "Error listando usuarios" })
    }
})


// Iniciar el servidor
app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log('Server starting......[OK]');
});