const { Pool } = require('pg')
const pool = new Pool({
   user: 'postgres',
   host: 'localhost',
   database: 'perntodo',
   password: process.env.PASS_PSQL,
   port: 5432,
})

module.exports = pool