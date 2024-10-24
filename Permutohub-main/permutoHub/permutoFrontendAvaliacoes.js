const prompt = require("prompt-sync")()
const permutoBackendAvaliacoes = require('./permutoBackendAvaliacoes')

let opcao = true

function menu() {
    console.log("=============================")
    console.log("[1] EXIBIR AVALIAÇÕES CADASTRADAS")
    console.log("[2] INSERIR AVALIAÇÃO")
    console.log("[3] DELETAR AVALIAÇÃO")
    console.log("[4] ENCONTRAR AVALIAÇÃO POR ID")
    console.log("[5] SAIR")
    console.log("")
}

while (opcao) {
    menu()
    let escolha = prompt("Digite a opção desejada: ")

    switch (escolha) {
        case "1":
            permutoBackendAvaliacoes.mostrarAvaliacoes()
            break

        case "2":
            let idUsuarioAvaliador = parseInt(prompt("Digite o ID do usuário que deixou a avaliação: "))
            let idUsuarioAvaliado = parseInt(prompt("Digite o ID do usuário avaliado: "))
            let nota = parseInt(prompt("Digite a nota (1 a 5): "))
            let comentario = prompt("Digite o comentário: ")
            let dataAvaliacao = prompt("Digite a data da avaliação (dd/mm/aaaa): ")
            permutoBackendAvaliacoes.inserirAvaliacao(idUsuarioAvaliador, idUsuarioAvaliado, nota, comentario, dataAvaliacao)
            break

        case "3":
            let idParaDeletar = parseInt(prompt("Digite o ID da avaliação: "))
            permutoBackendAvaliacoes.deletarAvaliacao(idParaDeletar)
            break

        case "4":
            let idParaEncontrar = parseInt(prompt("Digite o ID da avaliação: "))
            let avaliacaoEncontrada = permutoBackendAvaliacoes.encontrarAvaliacao(idParaEncontrar)
            if (avaliacaoEncontrada === -1) {
                console.log("Avaliação não encontrada.")
            } else {
                console.log("Avaliação com ID: " + idParaEncontrar + " encontrada")
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
