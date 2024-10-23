const prompt = require("prompt-sync")();
const permutoBackendUsuarios = require('./permutoBackendUsuarios.js');
let opcao = true;

function menu() {
    console.log("=============================");
    console.log("[1] EXIBIR USUÁRIOS CADASTRADOS");
    console.log("[2] INSERIR USUÁRIO");
    console.log("[3] DELETAR USUÁRIO");
    console.log("[4] ENCONTRAR USUÁRIO");
    console.log("[5] SAIR");
    console.log("");
}

while (opcao) {
    menu();
    let escolha = prompt("Digite a opção desejada: ");
    
    switch (escolha) {
        case "1":
            permutoBackendUsuarios.mostrarDados();
            break;

        case "2":
            let nome = prompt("Digite o nome do usuário: ");
            let email = prompt("Digite o email do usuário: ");
            let senha = prompt("Digite a senha do usuário: ");
            let descricao = prompt("Digite a descrição do usuário: ");
            permutoBackendUsuarios.inserirUsuario(nome, email, senha, descricao);
            break;

        case "3":
            let emailParaDeletar = prompt("Digite o email do usuário: ");
            permutoBackendUsuarios.deletarUsuario(emailParaDeletar);
            break;

        case "4":
            let emailParaEncontrar = prompt("Digite o email do usuário: ");
            let usuarioEncontrado = permutoBackendUsuarios.encontrarUsuario(emailParaEncontrar);
            if (usuarioEncontrado == -1) {
                console.log("Usuário não encontrado.");
            } else {
                console.log("Usuário " + emailParaEncontrar + " encontrado.");
            }
            break;

        case "5":
            console.log("Você saiu.");
            opcao = false;
            break;

        default:
            console.log("[ERRO] Digite uma opção válida.");
    }
}
