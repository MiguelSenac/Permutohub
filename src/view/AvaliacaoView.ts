import { Avaliacao } from "../entity/Avaliacao"
import { AvaliacaoService } from "../service//AvaliacaoService"
import { TrocaService } from "../service//TrocaService"
import promptSync from "prompt-sync"
import chalk from 'chalk'

export class AvaliacaoView {
    private avaliacaoService: AvaliacaoService
    private trocaService: TrocaService
    private prompt: promptSync.Prompt

    constructor() {
        this.avaliacaoService = new AvaliacaoService()
        this.trocaService = new TrocaService()
        this.prompt = new promptSync()
    }

    async exibirMenu(): Promise<void> {
        let rodando = true
        while (rodando) {
            console.log(chalk.yellow("================================"))
            console.log(chalk.blue.bold("MENU DE AVALIAÇÕES"))
            console.log(chalk.green("[1] Listar avaliações"))
            console.log(chalk.green("[2] Buscar avaliação por ID"))
            console.log(chalk.green("[3] Incluir avaliação"))
            console.log(chalk.green("[4] Remover avaliação"))
            console.log(chalk.green("[5] Atualizar avaliação"))
            console.log(chalk.red("[0] Sair"))
            console.log(chalk.yellow("================================"))

            let opcao = this.prompt(chalk.cyan("Escolha uma opção: "))

            switch (opcao) {
                case "1":
                    console.log(chalk.magenta("\nListando avaliações...\n"))
                    console.table(await this.avaliacaoService.listar())
                    break

                case "2":
                    const idBuscar = this.prompt(chalk.cyan("Digite o ID da avaliação: "))
                    console.log(chalk.magenta("\nBuscando avaliação...\n"))
                    console.table(await this.avaliacaoService.buscarPorId(idBuscar))
                    break

                case "3":
                    console.log(chalk.yellow("\nIniciando inclusão de avaliação...\n"))
                    console.table(await this.trocaService.listar())
                    const idTroca = this.prompt("ID da troca: ")
                    const nota = this.prompt("Nota (0 a 5): ")
                    const comentario = this.prompt("Comentário: ")
                    const dataAvaliacao = this.prompt("Data: ")

                    const novaAvaliacao = new Avaliacao(idTroca, nota, comentario, dataAvaliacao)
                    console.table(await this.avaliacaoService.inserir(novaAvaliacao))
                    break

                case "4":
                    console.log(chalk.red("\nRemovendo avaliação...\n"))
                    console.table(await this.avaliacaoService.listar())
                    let idRemover = this.prompt("Digite o ID da avaliação que deseja remover: ")
                    await this.avaliacaoService.remover(idRemover)
                    console.log(chalk.green("Avaliação removida com sucesso."))
                    break

                case "5":
                    console.log(chalk.yellow("\nEditando avaliação...\n"))
                    const novosDados = new Avaliacao()

                    const idAtualizar = this.prompt("Digite o ID da avaliação que deseja atualizar: ")
                    const novaNota = this.prompt("Nova nota (deixe em branco para manter a atual): ")
                    const novoComentario = this.prompt("Novo comentário (deixe em branco para manter o atual): ")
                    const novaDataAvaliacao = this.prompt("Nova data de avaliação (YYYY-MM-DD) (deixe em branco para manter a atual): ")

                    if (novaNota) novosDados.setNota(novaNota)
                    if (novoComentario) novosDados.setComentario(novoComentario)
                    if (novaDataAvaliacao) novosDados.setDataAvaliacao(novaDataAvaliacao)

                    const avaliacaoAtualizada = await this.avaliacaoService.atualizar(idAtualizar, novosDados)
                    console.table(avaliacaoAtualizada)
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
