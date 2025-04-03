import { AvaliacaoView } from "./AvaliacaoView"
import { ServicoView } from "./ServicoView"
import { TrocaView } from "./TrocaView"
import { UsuarioView } from "./UsuarioView"
import promptSync from "prompt-sync"
import chalk from 'chalk'

export class MainView {
    private prompt: promptSync.Prompt
    private avaliacaoView: AvaliacaoView
    private servicoView: ServicoView
    private trocaView: TrocaView
    private usuarioView: UsuarioView

    constructor() {
        this.prompt = new promptSync()
        this.avaliacaoView = new AvaliacaoView()
        this.servicoView = new ServicoView()
        this.trocaView = new TrocaView()
        this.usuarioView = new UsuarioView()
    }

    async exibirMenu(): Promise<void> {
        let rodando = true
        while (rodando) {
    
            console.log(chalk.yellow("================================"))
            console.log(chalk.blue.bold("MENU PRINCIPAL"))
            console.log(chalk.green("[1] Gerenciar Usuários"))
            console.log(chalk.green("[2] Gerenciar Serviços"))
            console.log(chalk.green("[3] Gerenciar Trocas"))
            console.log(chalk.green("[4] Gerenciar Avaliações"))
            console.log(chalk.red("[0] Sair"))
            console.log(chalk.yellow("================================"))

            let opcao = this.prompt(chalk.cyan("Escolha uma opção: "))

            switch (opcao) {
                case "1":
                    console.log(chalk.magenta("\nEntrando no Gerenciamento de Usuários...\n"))
                    await this.usuarioView.exibirMenu()
                    break
                
                case "2":
                    console.log(chalk.magenta("\nEntrando no Gerenciamento de Serviços...\n"))
                    await this.servicoView.exibirMenu()
                    break
                
                case "3":
                    console.log(chalk.magenta("\nEntrando no Gerenciamento de Trocas...\n"))
                    await this.trocaView.exibirMenu()
                    break
                
                case "4":
                    console.log(chalk.magenta("\nEntrando no Gerenciamento de Avaliações...\n"))
                    await this.avaliacaoView.exibirMenu()
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
