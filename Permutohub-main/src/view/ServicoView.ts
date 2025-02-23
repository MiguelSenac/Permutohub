import { ServicoService } from "../service/ServicoService"
import promptSync from "prompt-sync"

export class ServicoView {
    private servicoService: ServicoService
    private prompt: promptSync.Prompt

    constructor() {
        this.servicoService = new ServicoService()
        this.prompt = new promptSync()
    }

    async exibirMenu(): Promise<void> {
        let verdadeiro = true

        while (verdadeiro) {
            console.log("MENU")
            console.log("[1] Listar serviços")
            console.log("[2] Buscar serviços por Usuário")
            console.log("[3] Buscar serviço por ID")
            console.log("[4] Incluir serviço")
            console.log("[5] Editar serviço")
            console.log("[0] Sair")

            let opcao = this.prompt("Escolha uma opção: ")

            switch (opcao) {

                case "1":
                    console.table(await this.servicoService.listarServicos())
                    break
                
                case "2":
                    const idUsuarioServico = this.prompt("Digite o ID do usuário: ")
                    console.table(await this.servicoService.listarServicosPorUsuario(idUsuarioServico))
                    break

                case "3": 
                    const idServico = this.prompt("Digite o ID do serviço: ")
                    console.table(await this.servicoService.buscarServicoPorId(idServico))
                    break

                case "4":
                    const idUsuario = this.prompt("ID Usuario: ")
                    const titulo = this.prompt("Título: ")
                    const descricao = this.prompt("Descrição: ")
                    const data = this.prompt("Data: ")
                    console.table (await this.servicoService.inserirServico(idUsuario, titulo, descricao, data))
                    break

                case "5":
                    let dadosAtualizados: any = {}
                    const idAtualizar = this.prompt("Digite o ID do serviço que deseja editar: ")
                    const tituloAtualizar = this.prompt("Novo título: ")
                    const descricaoAtualizar = this.prompt("Nova descrição: ")
                    const dataAtualizar = this.prompt("Nova data: ")

                    if(tituloAtualizar) dadosAtualizados.titulo = tituloAtualizar
                    if(descricaoAtualizar) dadosAtualizados.descricao = descricaoAtualizar
                    if(dataAtualizar) dadosAtualizados.data = dataAtualizar
                    
                    const servicoAtualizado = await this.servicoService.atualizarServico(idAtualizar, dadosAtualizados)
                    console.table(servicoAtualizado)

                case "0":
                    console.log("Saindo...")
                    let verdadeiro = false
                    return

                default:
                    console.log("[ERRO] opção inválida")
            }

        }
    }


}
