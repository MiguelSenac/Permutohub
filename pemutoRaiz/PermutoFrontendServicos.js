const prompt = require("prompt-sync")()
const permutoBackendServicos = require('./permutoBackendServicos')

let opcao = true

function menu() {
    console.log("=============================")
    console.log("[1] EXIBIR SERVIÇOS CADASTRADOS")
    console.log("[2] INSERIR SERVIÇO")
    console.log("[3] DELETAR SERVIÇO")
    console.log("[4] ENCONTRAR SERVIÇO POR ID")
    console.log("[5] SAIR")
    console.log("")

opcao = true 
while(opcao){

    let escolha = prompt("Digite a opção desejada: ")

    switch(escolha){
        case "1":
            permutoBackendServicos.mostrarDados()
            menu()
            break
        
        case "2":
            let titulo = prompt("Digite o titulo do serviço: ")
            let descricao = prompt("Digite a descrição do serviço: ")
            let dataPublicacao = prompt("Digite a data de publicação do serviço com a mascara dd/mm/aaaa: ")
            let status = true
            permutoBackendServicos.inserirServico(titulo, descricao, dataPublicacao, status)
            menu()
            break

        case "3":
            let idParaDeletar = parseInt(prompt("Digite o ID do serviço: "))
            permutoBackendServicos.deletarServico(idParaDeletar)
            menu()
            break
        
        case "4":
            let idParaEncontrar = parseInt(prompt("Digite o ID do serviço: "))
            let servicoEncontrado = permutoBackendServicos.encontrarServico(idParaEncontrar)
            if (servicoEncontrado == -1){
                console.log("Serviço não encontrado.")
            }
            else{
                console.log("Serviço com ID: " + id + " encontrado")
            }
            menu()
            break

        case "5":
            console.log("Você saiu")
            opcao = false
            break

        default:
            console.log("[ERRO] Digite uma opção válida.")
            menu()
        

    }
}
}

module.exports = {menu}