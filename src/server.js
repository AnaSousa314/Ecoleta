const express = require("express")
const server = express()

//pegar o Banco de Dados
const db = require("./database/db")

//configurar pasta public
server.use(express.static("public"))



//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache: true//não use cache, assim se eu fizer alterações, ele mandará o novo e não o velho que está no cache
})


//configurar caminhos da minha aplicação
//pagina inicial
//req: Requisicao
//res:Resposta
server.get("/",(req,res)=>{
    return res.render("index.html",{title:"Um titulo"})
})


server.get("/create-point",(req,res)=>{

    //req.query: Query Strings da nossa url
    console.log(req.query)


    return res.render("create-point.html")
})




server.get("/search",(req,res)=>{
    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places`,function(err,rows){
        if(err){
            return console.log(err)
        }

        const total = rows.length
       // console.log(rows)
        //mostrar a página HTML com os dados do Banco de Dados
        return res.render("search-results.html",{places: rows, total:total})//pode ser só total, pq os nomes são iguais
    })  
})

//ligar o servidor
server.listen(3000)

