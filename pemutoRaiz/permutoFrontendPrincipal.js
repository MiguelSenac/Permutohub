const prompt = require("prompt-sync")()
const permutoFrontendUsuarios = require('./permutoFrontendUsuarios.js')
const permutoFrontendServicos = require('./permutoFrontendServicos.js')
const permutoFrontendTrocas = require('./permutoFrontendTrocas.js')
const permutoFrontendAvaliacoes = require('./permutoFrontendAvaliacoes.js')



function menu() {
    console.log("=============================")
    console.log("[1] USUARIOS")
    console.log("[2] SERVIÇOS")
    console.log("[3] TROCAS")
    console.log("[4] AVALIAÇÕES")
    console.log("[5] SAIR")
    console.log("=============================")
}

let opcao = true

 while(opcao){

    menu()
    escolha = prompt("Escolha uma opção: ")

    switch (escolha) {
        case '1':
            permutoFrontendUsuarios.menu()
            break

        case '2':
            permutoFrontendServicos.menu() 
            break

        case '3':
            permutoFrontendTrocas.menu() 
            break

        case '4':
            permutoFrontendAvaliacoes.menu()
            break

        case '5':
            console.log("Saindo...")
            opcao = false
            break

        default:
            console.log("[ERRO] Digite uma opção válida.")
    }
 }
