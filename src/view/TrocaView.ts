import { Troca } from "../entity/Troca"
import { TrocaService } from "../service/TrocaService"
import promptSync from "prompt-sync"

export class TrocaView {
    private trocaService: TrocaService
    private prompt: promptSync.Prompt

    constructor() {
        this.trocaService = new TrocaService()
        this.prompt = new promptSync()
    }

    async exibirMenu(): Promise<void> {
        let rodando = true
        while (rodando) {
            console.log("MENU TROCAS")
            console.log("[1] Listar trocas")
            console.log("[2] Buscar troca")
            console.log("[3] Incluir troca")
            console.log("[4] Remover troca")
            console.log("[5] Editar troca")
            console.log("[0] Sair")

            let opcao = this.prompt("Escolha uma opção: ")

            switch (opcao) {
                case "1":
                    console.table(await this.trocaService.listar())
                    break

                case "2":
                    const idBuscar = this.prompt("Digite o ID da troca: ")
                    console.table(await this.trocaService.buscarPorId(idBuscar))
                    break

                case "3":
                    const idUsuarioSolicitante = this.prompt("ID do usuário solicitante: ")
                    const idUsuarioReceptor = this.prompt("ID do usuário receptor: ")
                    const idServicoTrocado = this.prompt("ID do serviço trocado: ")
                    const dataTroca = this.prompt("Data da troca (YYYY-MM-DD): ")

                    const novaTroca = new Troca(
                        idUsuarioSolicitante,
                        idUsuarioReceptor,
                        idServicoTrocado,
                        dataTroca
                    )
                    console.table(await this.trocaService.inserir(novaTroca))
                    break

                case "4":
                    let idRemover = this.prompt("Digite o ID da troca que deseja remover: ")
                    await this.trocaService.remover(idRemover)
                    console.log("Troca removida com sucesso.")
                    break

                case "5":
                    const idAtualizar = this.prompt("Digite o ID da troca que deseja atualizar: ")
                    const novosDados = new Troca()
                    
                    const novaDataTroca = this.prompt("Nova data da troca (YYYY-MM-DD) (deixe em branco para manter a atual): ")
                    if (novaDataTroca) novosDados.setDataTroca(new Date(novaDataTroca))
                    
                    console.table(await this.trocaService.atualizar(idAtualizar, novosDados))
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
