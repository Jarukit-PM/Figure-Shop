const mysql = require('mysql2');
require('dotenv').config()

const env = process.env;

const pool = mysql.createPool({
    host: env.DB_HOST || env.BACKEND_SERVICE || 'localhost',
    port: Number(env.DB_PORT || env.BACKEND_PORT || 3306),
    user: env.MYSQL_USER || 'root',
    password: env.MYSQL_PASSWORD || undefined,
    database: env.MYSQL_DATABASE || 'test_nodejs',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});



module.exports.pool = pool.promise();

