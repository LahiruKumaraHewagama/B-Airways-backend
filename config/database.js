const {createPool}=require("mysql")
const mysql=require("mysql")

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit:10,
    multipleStatements: true,
    //ssl: true //false for Azure database
})


module.exports =pool