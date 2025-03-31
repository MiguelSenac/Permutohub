import { AvaliacaoView } from "./AvaliacaoView"
import { ServicoView } from "./ServicoView"
import { TrocaView } from "./TrocaView"
import { UsuarioView } from "./UsuarioView"
import promptSync from "prompt-sync"

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
            console.log("MENU PRINCIPAL")
            console.log("[1] Gerenciar Usuários")
            console.log("[2] Gerenciar Serviços")
            console.log("[3] Gerenciar Trocas")
            console.log("[4] Gerenciar Avaliações")
            console.log("[0] Sair")

            let opcao = this.prompt("Escolha uma opção: ")

            switch (opcao) {
                case "1":
                    await this.usuarioView.exibirMenu()
                    break
                
                case "2":
                    await this.servicoView.exibirMenu()
                    break
                
                case "3":
                    await this.trocaView.exibirMenu()
                    break
                
                case "4":
                    await this.avaliacaoView.exibirMenu()
                    break
                
                case "0":
                    console.log("Saindo...")
                    rodando = false
                    break
                
                default:
                    console.log("[ERRO] Opção inválida")
            }
        }
    }
}
