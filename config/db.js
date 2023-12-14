require('dotenv').config();
let mysql = require('mysql');

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;

const db = mysql.createPool({
    host: dbHost,
    user: dbUser,
    password: dbPass,
    database: dbName,
    port: dbPort,
    max: 20,
})

db.getConnection((err, connexion) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Nous sommes bien connectés à la BDD");
    }
})

module.exports = db;