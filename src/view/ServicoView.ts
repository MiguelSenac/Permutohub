import { ServicoService } from "../service/ServicoService"
import promptSync from "prompt-sync"
import { Servico } from "../entity/Servico";


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
            console.log("MENU")
            console.log("[1] Listar serviços")
            console.log("[2] Buscar serviços por Usuário")
            console.log("[3] Buscar serviço por ID")
            console.log("[4] Incluir serviço")
            console.log("[5] Remover serviço")
            console.log("[6] Editar serviço")
            console.log("[0] Sair")

            let opcao = this.prompt("Escolha uma opção: ")

            switch (opcao) {

                case "1":
                    console.table(await this.servicoService.listar())
                    break
                
                case "2":
                    const idUsuarioServico = this.prompt("Digite o ID do usuário: ")
                    console.table(await this.servicoService.listarPorUsuario(idUsuarioServico))
                    break

                case "3": 
                    const idServico = this.prompt("Digite o ID do serviço: ")
                    console.table(await this.servicoService.buscarPorId(idServico))
                    break

                case "4":
                    const idUsuario = this.prompt("ID Usuario: ")
                    const titulo = this.prompt("Título: ")
                    const descricao = this.prompt("Descrição: ")
                    const data = this.prompt("Data: ")
                    const ativo = true

                    const novoServico = new Servico(idUsuario, titulo, descricao, data, ativo)
                    
                    console.table(await this.servicoService.inserir(novoServico))
                    break

                case "5":
                    let idRemover = this.prompt("Digite o ID do serviço que deseja remover: ")
                    await this.servicoService.remover(idRemover)
                    break

                case "6":
                    const dadosAtualizados = new Servico()

                    const idAtualizar = this.prompt("Digite o ID do serviço que deseja editar: ")
                    const tituloAtualizar = this.prompt("Novo título (pressione ENTER para manter o atual): ")
                    const descricaoAtualizar = this.prompt("Nova descrição (pressione ENTER para manter a atual): ")
                    const dataAtualizar = this.prompt("Nova data (formato AAAA-MM-DD) (pressione ENTER para manter a atual): ")
                    const ativoAtualizar = this.prompt("Ativo? (S/N) (pressione ENTER para manter o atual): ")
                    
                    if(tituloAtualizar) dadosAtualizados.setTitulo(tituloAtualizar)
                    if(descricaoAtualizar) dadosAtualizados.setDescricao(descricaoAtualizar)
                    if(dataAtualizar) dadosAtualizados.setData(dataAtualizar)
                    if(ativoAtualizar) dadosAtualizados.setAtivo(ativoAtualizar)

                    const servicoAtualizado = await this.servicoService.atualizar(idAtualizar, dadosAtualizados)
                    console.table(servicoAtualizado)
                    break

                case "0":
                    console.log("Saindo...")
                    rodando = false
                    break

                default:
                    console.log("[ERRO] opção inválida")
            }

        }
    }


}
