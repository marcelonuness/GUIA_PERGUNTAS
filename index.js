const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const perguntaModel = require("./database/pergunta")
//database

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
})
    .catch((error) => {
        console.log(error)
    })

//Estou dizendo ao ExpressJS usar o EJS como View engine
app.set("view engine", "ejs")
app.use(express.static("public"))
// body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// rotas
app.get("/", (req, res) => {
    res.render("index")
})

app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})

/* O método POST é geralmente utilizado para o envio de dados de um formulário
por conta da segurança do mesmo */
app.post("/salvarpergunta", (req, res) => {
    let titulo = req.body.titulo
    let descricao = req.body.descricao
    res.send(`formulário recebido! título: ${titulo} descricao: ${descricao}`)
})

app.listen(8080, () => {
    console.log("App rodando!")
})