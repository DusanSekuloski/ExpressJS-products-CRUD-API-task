const { Pool } = require('pg');

const pool = new Pool({
    user: 'dusan',
    host: 'localhost',
    database: 'products_db',
    password: '23022001',
    port: 5432,
});

module.exports = pool;
