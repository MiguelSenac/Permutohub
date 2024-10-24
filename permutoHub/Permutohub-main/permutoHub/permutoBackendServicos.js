const servicos = [
    {id:1, titulo:"Desenvolvimento de Website" , descricao: "Criação de um site responsivo e otimizado", dataPublicacao:"23/10/2024",  status:"Ativo"},
    {id:2, titulo:"Criação de arte visual" , descricao: "Criação de toda arte visual da empresa", dataPublicacao:"23/10/2024",  status:"Ativo"}
]

let id = servicos.length+1

function mostrarDados(){
    console.table(servicos)
}

function inserirServico(titulo, descricao, dataPublicacao){
    if(!titulo || !descricao || !dataPublicacao){
        console.log("É necessario preencher todos os campos")
    }
    else{
        servicos.push({id: id, titulo, descricao, dataPublicacao})
        id++
    }
}

function encontrarServico(id){
    return servicos.findIndex(servico => servico.id === id)
}

function deletarServico(id){
    const indice = encontrarServico(id)
    if(indice != -1){
        servicos.splice(indice, 1)
        console.log("Serviço deletado com sucesso")
    }
    else{
        console.log("Nennhum serviço com o id: " + id + " encontrado")
    }
}

module.exports = {mostrarDados, encontrarServico, inserirServico, deletarServico}

