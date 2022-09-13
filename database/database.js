const sequelize = require("sequelize")

const connection = new sequelize("guiaperguntas", "root", "mhna..311", {
    host: "localhost",
    dialect: "mysql",
    logging: false
})

module.exports = connection