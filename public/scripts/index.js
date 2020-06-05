const buttonSearch = document.querySelector("#page-home main a")//aqui ele cria uma variavel, e procura no html qual ponto ficará armazenado nela no caso a unica tag "a" que tem nesse endereço

const modal = document.querySelector("#modal")//cria uma var q vai receber a ID modal
const close = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", ()=>{
    modal.classList.remove("hide")//pode usar o toggle
})

close.addEventListener("click",() => {
    modal.classList.add("hide")
})