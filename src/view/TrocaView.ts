import { Troca } from "../entity/Troca"
import { TrocaService } from "../service/TrocaService"
import { UsuarioService } from "../service/UsuarioService"
import { ServicoService } from "../service/ServicoService"

import promptSync from "prompt-sync"
import chalk from 'chalk'

export class TrocaView {
    private trocaService: TrocaService
    private usuarioService: UsuarioService
    private servicoService: ServicoService
    private prompt: promptSync.Prompt

    constructor() {
        this.trocaService = new TrocaService()
        this.usuarioService = new UsuarioService()
        this.servicoService = new ServicoService()
        this.prompt = new promptSync()
    }

    async exibirMenu(): Promise<void> {
        let rodando = true
        while (rodando) {
           
            console.log(chalk.yellow("================================"))
            console.log(chalk.blue.bold("MENU TROCAS"))
            console.log(chalk.green("[1] Listar trocas"))
            console.log(chalk.green("[2] Buscar troca"))
            console.log(chalk.green("[3] Incluir troca"))
            console.log(chalk.green("[4] Remover troca"))
            console.log(chalk.green("[5] Editar troca"))
            console.log(chalk.red("[0] Sair"))
            console.log(chalk.yellow("================================"))

            let opcao = this.prompt(chalk.cyan("Escolha uma opção: "))

            switch (opcao) {
                case "1":
                    console.log(chalk.magenta("\nListando trocas...\n"))
                    console.table(await this.trocaService.listar())
                    break

                case "2":
                    const idBuscar = this.prompt(chalk.cyan("Digite o ID da troca: "))
                    console.log(chalk.magenta("\nBuscando troca...\n"))
                    console.table(await this.trocaService.buscarPorId(idBuscar))
                    break

                case "3":
                    console.log(chalk.yellow("\nIniciando inclusão de troca...\n"))
                    console.table(await this.usuarioService.listar())
                    const idUsuarioSolicitante = this.prompt("ID do usuário ofertante: ")
                    const idUsuarioReceptor = this.prompt("ID do usuário receptor: ")
                    console.table(await this.servicoService.listar())
                    const idServicoTrocado = this.prompt("ID do serviço trocado: ")
                    const dataTroca = this.prompt("Data da troca (DD/MM/AAAA): ")

                    const novaTroca = new Troca(idUsuarioSolicitante, idUsuarioReceptor, idServicoTrocado, dataTroca)
                    console.table(await this.trocaService.inserir(novaTroca))
                    break

                case "4":
                    console.log(chalk.red("\nRemovendo troca...\n"))
                    console.table(await this.trocaService.listar())
                    let idRemover = this.prompt("Digite o ID da troca que deseja remover: ")
                    await this.trocaService.remover(idRemover)
                    console.log(chalk.green("Troca removida com sucesso."))
                    break

                case "5":
                    console.log(chalk.yellow("\nEditando troca...\n"))
                    const idAtualizar = this.prompt("Digite o ID da troca que deseja atualizar: ")
                    const novosDados = new Troca()
                    const novaDataTroca = this.prompt("Nova data da troca (deixe em branco para manter a atual): ")


                    if (novaDataTroca) novosDados.setDataTroca(novaDataTroca)

                    console.table(await this.trocaService.atualizar(idAtualizar, novosDados))
                    break

                case "0":
                    console.log(chalk.red("\nSaindo..."))
                    rodando = false
                    break

                default:
                    console.log(chalk.red("[ERRO] Opção inválida"))
            }
        }
    }
}
