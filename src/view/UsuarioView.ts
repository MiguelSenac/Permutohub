import { Usuario } from "../entity/Usuario"
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
        let rodando = true
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
                    console.table(await this.usuarioService.listar())
                    break
 
                case "2":
                    const idBuscar = this.prompt("Digite o ID do usuário: ")
                    console.table(await this.usuarioService.buscarPorId(idBuscar))
                    break

                case "3":
                    const usuarioInserir = this.prompt("Usuario: ")
                    const nomeInserir = this.prompt("Nome: ")
                    const emailInserir = this.prompt("Email: ")
                    const senhaInserir = this.prompt("Senha: ")
                    const descricaoInserir = this.prompt("Descrição: ")

                    const novoUsuario = new Usuario(usuarioInserir, nomeInserir, emailInserir, senhaInserir, descricaoInserir)
                    
                    console.table(await this.usuarioService.inserir(novoUsuario))
                    break

                case "4":
                    let idRemover = this.prompt("Digite o ID do usuário que deseja remover: ")
                    await this.usuarioService.remover(idRemover)
                    break

                    case "5":

                        const dadosAtualizados = new Usuario()

                        const idAtualizar = this.prompt("Digite o ID do usuário que deseja editar: ")
                        const usuarioAtualizar = this.prompt("Novo nome de usuário (deixe em branco para manter o atual): ")
                        const nomeAtualizar = this.prompt("Novo nome (deixe em branco para manter o atual): ")
                        const emailAtualizar = this.prompt("Novo e-mail (deixe em branco para manter o atual): ")
                        const senhaAtualizar = this.prompt("Nova senha (deixe em branco para manter a atual): ")
                        const perfilAtualizar = this.prompt("Nova descrição (deixe em branco para manter a atual): ")
    
                    
                        if (usuarioAtualizar) dadosAtualizados.setUsuario(usuarioAtualizar)
                        if (nomeAtualizar) dadosAtualizados.setNome(nomeAtualizar)
                        if (emailAtualizar) dadosAtualizados.setEmail(emailAtualizar)
                        if (senhaAtualizar) dadosAtualizados.setSenha(senhaAtualizar)
                        if (perfilAtualizar) dadosAtualizados.setPerfil(perfilAtualizar)
    
                        const usuarioAtualizado = await this.usuarioService.atualizar(idAtualizar, dadosAtualizados)
                        console.table(usuarioAtualizado)
                        break
                    
                case "0":
                    console.log("Saindo...")
                    rodando = false
                    return

                default:
                    console.log("[ERRO] Opção inválida")
            }

        }
    }



}       