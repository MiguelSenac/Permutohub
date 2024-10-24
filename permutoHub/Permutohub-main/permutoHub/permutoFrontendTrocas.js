const prompt = require("prompt-sync")()
const permutoBackendTrocas = require('./permutoBackendTrocas')

let opcao = true

function menu() {
    console.log("=============================")
    console.log("[1] EXIBIR TROCAS CADASTRADAS")
    console.log("[2] INSERIR TROCA")
    console.log("[3] DELETAR TROCA")
    console.log("[4] ENCONTRAR TROCA POR ID")
    console.log("[5] SAIR")
    console.log("")
}

while (opcao) {
    menu()
    let escolha = prompt("Digite a opção desejada: ")

    switch (escolha) {
        case "1":
            permutoBackendTrocas.mostrarTrocas()
            break

        case "2":
            let idUsuarioOfertante = parseInt(prompt("Digite o ID do usuário ofertante: "))
            let idUsuarioReceptor = parseInt(prompt("Digite o ID do usuário receptor: "))
            let idServicoTrocado = parseInt(prompt("Digite o ID do serviço trocado: "))
            let dadosTroca = prompt("Digite os dados da troca: ")
            permutoBackendTrocas.inserirTroca(idUsuarioOfertante, idUsuarioReceptor, idServicoTrocado, dadosTroca)
            break

        case "3":
            let idParaDeletar = parseInt(prompt("Digite o ID da troca: "))
            permutoBackendTrocas.deletarTroca(idParaDeletar)
            break

        case "4":
            let idParaEncontrar = parseInt(prompt("Digite o ID da troca: "))
            let trocaEncontrada = permutoBackendTrocas.encontrarTroca(idParaEncontrar)
            if (trocaEncontrada === -1) {
                console.log("Troca não encontrada.")
            } else {
                console.log("Troca com ID: " + idParaEncontrar + " encontrada")
            }
            break

        case "5":
            console.log("Você saiu")
            opcao = false
            break

        default:
            console.log("[ERRO] Digite uma opção válida.")
    }
}
