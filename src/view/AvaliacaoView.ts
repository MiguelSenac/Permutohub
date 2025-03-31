import { Avaliacao } from "../entity/Avaliacao"
import { AvaliacaoService } from "../service//AvaliacaoService"
import promptSync from "prompt-sync"

export class AvaliacaoView {
    private avaliacaoService: AvaliacaoService
    private prompt: promptSync.Prompt

    constructor() {
        this.avaliacaoService = new AvaliacaoService()
        this.prompt = new promptSync()
    }

    async exibirMenu(): Promise<void> {
        let rodando = true
        while (rodando) {
            console.log("MENU DE AVALIAÇÕES")
            console.log("[1] Listar avaliações")
            console.log("[2] Buscar avaliação por ID")
            console.log("[3] Incluir avaliação")
            console.log("[4] Remover avaliação")
            console.log("[5] Atualizar avaliação")
            console.log("[0] Sair")

            let opcao = this.prompt("Escolha uma opção: ")

            switch (opcao) {
                case "1":
                    console.table(await this.avaliacaoService.listar())
                    break

                case "2":
                    const idBuscar = this.prompt("Digite o ID da avaliação: ")
                    console.table(await this.avaliacaoService.buscarPorId(idBuscar))
                    break

                case "3":
                    const idTroca = this.prompt("ID da troca: ")
                    const nota = this.prompt("Nota (0 a 5): ")
                    const comentario = this.prompt("Comentário: ")
                    const dataAvaliacao = this.prompt("Data: ")

                    const novaAvaliacao = new Avaliacao(idTroca, nota, comentario, dataAvaliacao)
                    console.table(await this.avaliacaoService.inserir(novaAvaliacao))
                    break

                case "4":
                    let idRemover = this.prompt("Digite o ID da avaliação que deseja remover: ")
                    await this.avaliacaoService.remover(idRemover)
                    console.log("Avaliação removida com sucesso.")
                    break

                case "5":
                    const novosDados = new Avaliacao()

                    
                    const idAtualizar = this.prompt("Digite o ID da avaliação que deseja atualizar: ")
                    const novaNota = this.prompt("Nova nota (deixe em branco para manter a atual): ")
                    const novoComentario = this.prompt("Novo comentário (deixe em branco para manter o atual): ")
                    const novaDataAvaliacao = this.prompt("Nova data de avaliação (YYYY-MM-DD) (deixe em branco para manter a atual): ")


                    if (novaNota) novosDados.setNota (novaNota)
                    if (novoComentario) novosDados.setComentario(novoComentario)
                    if (novaDataAvaliacao) novosDados.setDataAvaliacao (novaDataAvaliacao)

                    const avaliacaoAtualizada = await this.avaliacaoService.atualizar(idAtualizar, novosDados)
                    console.table(avaliacaoAtualizada)
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
