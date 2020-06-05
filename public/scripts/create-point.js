
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())//isso é uma função anonima que esta retornando esse valor
    .then( states => {
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option> `
        }
    })

}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

   const ufValue = event.target.value

   const indexOfSelectState = event.target.selectedIndex
   stateInput.value = event.target.options[indexOfSelectState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML="<option value>Selecione a Cidade</option>"//esses dois comandos servem para limpar os dados toda vez que um novo estado for selecionado
    citySelect.disabled = true
    
    fetch(url)
    .then(res => res.json())//isso é uma função anonima que esta retornando esse valor
    .then( cities => {
        

        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option> `
        }

        citySelect.disabled = false
    })
}

document.querySelector("select[name=uf]").addEventListener("change", getCities)

/*
document.querySelector("select[name=uf]").addEventListener("change", ()=>{
    console.log("mudei")
}isso é outra forma de criar uma função anonima)*/


//Items de coleta
// pegar todos os li

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click",handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    //adicionar ou remover uma classe com js
    itemLi.classList.toggle("selected")//o toglle adiciona ou remove

    const itemId = itemLi.dataset.id;
    
    //verificar se existem items selecionados, se sim, pegar os items selecionados

    const alreadySelected = selectedItems.findIndex(item =>{const itemFound = item == itemId 
        return itemFound
    })

    //se já estiver selecionado, 
    if(alreadySelected >=0){
        //tirar da seleção
        const filteredItems = selectedItems.filter(item=>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }else{
        //se não estiver selecionado, adicionar a seleção
        selectedItems.push(itemId)
    }

    //adicionar o campo escondido com os itens selecionados   
    //document.querySelector("iput[name=items]")
    collectedItems.value = selectedItems
}