const {Pool} = require('pg');

const pool = new Pool ({
    user: 'default_user',
    host: 'localhost',
    database: 'default_database',
    password: 'default_password',
    port: 5432,
});

module.exports = pool;
