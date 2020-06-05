const express = require("express")
const server = express()


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
    return res.render("create-point.html")
})

server.get("/search",(req,res)=>{
    return res.render("search-results.html")
})

//ligar o servidor
server.listen(3000)

