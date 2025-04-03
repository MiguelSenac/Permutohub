import { Usuario } from "../entity/Usuario"
import { UsuarioService } from "../service/UsuarioService"
import promptSync from "prompt-sync"
import chalk from 'chalk'

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
           
            console.log(chalk.yellow("===================="))
            console.log(chalk.blue.bold("\nMENU"))
            console.log(chalk.green("[1] Listar usuários"))
            console.log(chalk.green("[2] Buscar usuário"))
            console.log(chalk.green("[3] Incluir usuário"))
            console.log(chalk.green("[4] Remover usuário"))
            console.log(chalk.green("[5] Editar usuário"))
            console.log(chalk.red("[0] Sair")) 
            console.log(chalk.yellow("===================="))

            let opcao = this.prompt(chalk.cyan("Escolha uma opção: "))

            switch (opcao) {
                case "1":
                    console.log(chalk.magenta("\nListando usuários...\n"))
                    console.table(await this.usuarioService.listar())
                    break

                case "2":
                    const idBuscar = this.prompt(chalk.cyan("Digite o ID do usuário: "))
                    console.log(chalk.magenta("\nBuscando usuário...\n"))
                    console.table(await this.usuarioService.buscarPorId(idBuscar))
                    break

                case "3":
                    console.log(chalk.yellow("\nInserindo novo usuário...\n"))
                    const usuarioInserir = this.prompt("Usuario: ")
                    const nomeInserir = this.prompt("Nome: ")
                    const emailInserir = this.prompt("Email: ")
                    const senhaInserir = this.prompt("Senha: ")
                    const descricaoInserir = this.prompt("Descrição: ")

                    const novoUsuario = new Usuario(usuarioInserir, nomeInserir, emailInserir, senhaInserir, descricaoInserir)
                    
                    try {
                        const usuarioCriado = await this.usuarioService.inserir(novoUsuario)
                        console.table(usuarioCriado)
                    } catch (error) {
                        console.log(chalk.red("[ERRO] Não foi possível inserir o usuário:", error.message))
                    }
                    break

                case "4":
                    console.log(chalk.red("\nRemovendo usuário...\n"))
                    console.table(await this.usuarioService.listar())
                    let idRemover = this.prompt("Digite o ID do usuário que deseja remover: ")
                    await this.usuarioService.remover(idRemover)
                    break

                case "5":
                    console.log(chalk.yellow("\nEditando usuário...\n"))
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
                    console.log(chalk.red("\nSaindo..."))
                    rodando = false
                    return

                default:
                    console.log(chalk.red("[ERRO] Opção inválida"))
            }
        }
    }
}
