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



const knex = require('knex');

const db = knex({
    client: 'mysql2',
    connection: {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database,
    },
});

module.exports = db;
