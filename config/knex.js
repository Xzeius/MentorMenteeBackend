// const knex = require('knex');

// const db = knex({
//     client: 'mysql2',
//     connection: {
//         host: 'localhost',
//         user: 'root',
//         password: 'root',
//         database: 'college_db',
//     },
// });

// module.exports = db;



// const knex = require('knex');

// const db = knex({
//     client: 'mysql2',
//     connection: {
//         host: process.env.host,
//         user: process.env.user,
//         password: process.env.password,
//         database: process.env.database,
//     },
// });

// module.exports = db;

require('dotenv').config();
const knex = require('knex');

const db = knex({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
});

module.exports = db;
