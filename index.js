const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const pergunta = require("./database/pergunta")
const Resposta = require("./database/Resposta")

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
    pergunta.findAll({ raw: true, order: [
        ["id", "DESC"] //ASC = crescente || DESC = decrescente
    ] }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        })
    })
})

app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})

/* O método POST é geralmente utilizado para o envio de dados de um formulário
por conta da segurança do mesmo */
app.post("/salvarpergunta", (req, res) => {
    let titulo = req.body.titulo
    let descricao = req.body.descricao
    pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    })
})

app.get("/perguntar/:id", (req, res) => {
    let id = req.params.id
    pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if (pergunta != undefined) {
            res.render("pergunta", {
                pergunta: pergunta
            })
        } else {
            res.redirect("/")
        }
    })

})

app.listen(8080, () => {
    console.log("App rodando!")
})