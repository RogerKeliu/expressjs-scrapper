const env = process.env;
const fs = require('fs');
const db = {
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || 'roger2011',
    database: env.DB_NAME || 'programming_languages',
    port: env.DB_PORT || 3306,
};

module.exports = db;
