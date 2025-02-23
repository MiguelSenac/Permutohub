import { UsuarioService } from "../service/UsuarioService"
import promptSync from "prompt-sync"



export class UsuarioView {
    private usuarioService: UsuarioService
    private prompt: promptSync.Prompt

    constructor() {
        this.usuarioService = new UsuarioService()
        this.prompt = new promptSync()
    }

    async exibirMenu(): Promise<void> {
        let verdadeiro = true
        while (true) {
            console.log("MENU")
            console.log("[1] Listar usuários")
            console.log("[2] Buscar usuário")
            console.log("[3] Incluir usuário")
            console.log("[4] Remover usuário")
            console.log("[5] Editar usuário")
            console.log("[0] Sair")

            let opcao = this.prompt("Escolha uma opção: ")

            switch (opcao) {
                case "1":
                    console.table(await this.usuarioService.listarUsuarios())
                    break

                case "2":
                    const emailBuscar = this.prompt("Digite o email do usuário que deseja buscar: ")
                    console.table(await this.usuarioService.buscarUsuarioPorEmail(emailBuscar))
                    break

                case "3":
                    const usuarioInserir = this.prompt("Usuario: ")
                    const nomeInserir = this.prompt("Nome: ")
                    const emailInserir = this.prompt("Email: ")
                    const senhaInserir = this.prompt("Senha: ")
                    const descricaoInserir = this.prompt("Descrição: ")
                    console.table(await this.usuarioService.inserirUsuario(usuarioInserir, nomeInserir, emailInserir, senhaInserir, descricaoInserir))
                    break

                case "4":
                    let emailRemover = this.prompt("Digite o email do usuário que deseja remover: ")
                    console.table(await this.usuarioService.removerUsuario(emailRemover))
                    break

                case "5":

                    let dadosAtualizados: any = {}
                    const idAtualizar = this.prompt("Digite o ID do usuário que deseja editar")
                    const usuarioAtualizar = this.prompt("Novo nome de usuário (deixe em branco para manter o atual): ")
                    const nomeAtualizar = this.prompt("Novo nome (deixe em branco para manter o atual): ")
                    const emailAtualizar = this.prompt("Novo e-mail (deixe em branco para manter o atual): ")
                    const senhaAtualizar = this.prompt("Nova senha (deixe em branco para manter a atual): ")
                    const descricaoAtualizar = this.prompt("Nova descrição (deixe em branco para manter a atual): ")

                    if (usuarioAtualizar) dadosAtualizados.usuario = usuarioAtualizar;
                    if (nomeAtualizar) dadosAtualizados.nome = nomeAtualizar;
                    if (emailAtualizar) dadosAtualizados.email = emailAtualizar;
                    if (senhaAtualizar) dadosAtualizados.senha = senhaAtualizar;
                    if (descricaoAtualizar) dadosAtualizados.descricao = descricaoAtualizar;

                    const usuarioAtualizado = await this.usuarioService.atualizarUsuario(idAtualizar, dadosAtualizados);
                    console.table(usuarioAtualizado);
                    break
                    
                case "0":
                    console.log("Saindo...")
                    let verdadeiro = false
                    return

                default:
                    console.log("[ERRO] Opção inválida")
            }

        }
    }



}       