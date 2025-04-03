import { ServicoService } from "../service/ServicoService"
import promptSync from "prompt-sync"
import { Servico } from "../entity/Servico"
import chalk from 'chalk'

export class ServicoView {
    private servicoService: ServicoService
    private prompt: promptSync.Prompt

    constructor() {
        this.servicoService = new ServicoService()
        this.prompt = new promptSync()
    }

    async exibirMenu(): Promise<void> {
        let rodando = true

        while (rodando) {
            console.log(chalk.yellow("===================="))
            console.log(chalk.blue.bold("\nMENU"))
            console.log(chalk.green("[1] Listar serviços"))
            console.log(chalk.green("[2] Buscar serviços por Usuário"))
            console.log(chalk.green("[3] Buscar serviço por ID"))
            console.log(chalk.green("[4] Incluir serviço"))
            console.log(chalk.green("[5] Remover serviço"))
            console.log(chalk.green("[6] Editar serviço"))
            console.log(chalk.red("[0] Sair")) 
            console.log(chalk.yellow("===================="))

            let opcao = this.prompt(chalk.cyan("Escolha uma opção: "))

            switch (opcao) {

                case "1":
                    console.log(chalk.magenta("\nListando serviços...\n"))
                    console.table(await this.servicoService.listar())
                    break
                
                case "2":
                    const idUsuarioServico = this.prompt(chalk.cyan("Digite o ID do usuário: "))
                    console.log(chalk.magenta("\nBuscando serviços por usuário...\n"))
                    console.table(await this.servicoService.listarPorUsuario(idUsuarioServico))
                    break

                case "3": 
                    const idServico = this.prompt(chalk.cyan("Digite o ID do serviço: "))
                    console.log(chalk.magenta("\nBuscando serviço por ID...\n"))
                    console.table(await this.servicoService.buscarPorId(idServico))
                    break

                case "4":
                    console.log(chalk.yellow("\nInserindo novo serviço...\n"))
                    const idUsuario = this.prompt("ID Usuario: ")
                    const titulo = this.prompt("Título: ")
                    const descricao = this.prompt("Descrição: ")
                    const data = this.prompt("Data: ")
                    const ativo = true

                    const novoServico = new Servico(idUsuario, titulo, descricao, data, ativo)
                    
                    console.table(await this.servicoService.inserir(novoServico))
                    break

                case "5":
                    console.log(chalk.red("\nRemovendo serviço...\n"))
                    console.table(await this.servicoService.listar())
                    let idRemover = this.prompt("Digite o ID do serviço que deseja remover: ")
                    await this.servicoService.remover(idRemover)
                    break

                case "6":
                    console.log(chalk.yellow("\nEditando serviço...\n"))
                    const dadosAtualizados = new Servico()

                    const idAtualizar = this.prompt("Digite o ID do serviço que deseja editar: ")
                    const tituloAtualizar = this.prompt("Novo título (pressione ENTER para manter o atual): ")
                    const descricaoAtualizar = this.prompt("Nova descrição (pressione ENTER para manter a atual): ")
                    const dataAtualizar = this.prompt("Nova data (pressione ENTER para manter a atual): ")
                    const ativoAtualizar = this.prompt("Ativo? (S/N) (pressione ENTER para manter o atual): ")
                    
                    if(tituloAtualizar) dadosAtualizados.setTitulo(tituloAtualizar)
                    if(descricaoAtualizar) dadosAtualizados.setDescricao(descricaoAtualizar)
                    if(dataAtualizar) dadosAtualizados.setData(dataAtualizar)
                    if(ativoAtualizar) dadosAtualizados.setAtivo(ativoAtualizar)

                    const servicoAtualizado = await this.servicoService.atualizar(idAtualizar, dadosAtualizados)
                    console.table(servicoAtualizado)
                    break

                case "0":
                    console.log(chalk.red("\nSaindo..."))
                    rodando = false
                    break

                default:
                    console.log(chalk.red("[ERRO] opção inválida"))
            }

        }
    }
}
