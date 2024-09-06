
// Backend/config/db.js
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',       // Your database host, typically 'localhost'
    user: 'root',   // Your MySQL username
    password: 'root', // Your MySQL password
    database: 'college_db', // The database name you're connecting to
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = connection;
