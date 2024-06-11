require('dotenv').config();

module.exports.Config = {
    port:process.env.PORT,
    mysql_host: process.env.MYSQL_HOST,
    mysql_user: process.env.MYSQL_USER,
    mysql_password: process.env.MYSQL_PASSWORD,
    mysql_db: process.env.MYSQL_DB
};