const prompt = require("prompt-sync")();
const usuarios_back = require('./usuarios_back');

async function menu() {
  let opcao = true;

  while (opcao) {
    console.log("=============================")
    console.log("[1] EXIBIR USUÁRIOS CADASTRADOS")
    console.log("[2] INSERIR USUÁRIO")
    console.log("[3] DELETAR USUÁRIO")
    console.log("[4] ENCONTRAR USUÁRIO")
    console.log("[5] ATUALIZAR USUÁRIO")
    console.log("[6] SAIR")
    console.log("")

    const escolha = prompt("Digite a opção desejada: ")

    switch (escolha) {
      case "1":
        await usuarios_back.mostrarUsuarios()
        break

      case "2":
        await usuarios_back.inserirUsuarios()
        break

      case "3": {
        await usuarios_back.deletarUsuarios()
        break
      }

      case "4": {
        await usuarios_back.pesquisarUsuarios()
        break
      }

      case "5":
        await usuarios_back.atualizarUsuarios()
        break

      case "6":
        console.log("Você saiu.")
        opcao = false
        break

      default:
        console.log("[ERRO] Digite uma opção válida.")
        break
    }
  }
}
menu()
module.exports = { menu }