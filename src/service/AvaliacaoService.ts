import { Avaliacao } from "../entity/Avaliacao"
import { AvaliacaoRepository } from "../repository/AvaliacaoRepository"
import { InterfaceService } from "./InterfaceService"

export class AvaliacaoService implements InterfaceService<Avaliacao> {
    private avaliacaoRepository: AvaliacaoRepository

    constructor() {
        this.avaliacaoRepository = new AvaliacaoRepository()
    }

    async listar(): Promise<Avaliacao[]> {
        try {
            return await this.avaliacaoRepository.listar()
        } catch (error) {
            console.error("[ERRO] Falha ao listar avaliações", error)
            throw new Error("Falha ao listar avaliações")
        }
    }

    async buscarPorId(id: string): Promise<Avaliacao | null> {
        try {
            return await this.avaliacaoRepository.buscarPorId(id)
        } catch (error) {
            console.error("[ERRO] Falha ao buscar avaliação por ID", error)
            throw new Error("Falha ao buscar avaliação por ID")
        }
    }

    async inserir(objeto: Avaliacao): Promise<Avaliacao> {
        try {
            if (!objeto.getIdTroca() || objeto.getNota() === undefined) {
                throw new Error("[ERRO] ID da troca e nota são obrigatórios")
            }

            // if (objeto.getNota() < 1 || objeto.getNota() > 5) {
            //     throw new Error("[ERRO] A nota deve estar entre 1 e 5")
            // }

            return await this.avaliacaoRepository.inserir(objeto)
        } catch (error) {
            console.error("[ERRO] Falha ao inserir avaliação", error)
            throw new Error("Falha ao inserir avaliação")
        }
    }

    async remover(id: string): Promise<boolean> {
        try {
            const avaliacaoExistente = await this.avaliacaoRepository.buscarPorId(id)
            if (!avaliacaoExistente) {
                throw new Error("[ERRO] Nenhuma avaliação encontrada com esse ID")
            }

            return await this.avaliacaoRepository.remover(id)
        } catch (error) {
            console.error("[ERRO] Falha ao remover avaliação", error)
            throw new Error("Falha ao remover avaliação")
        }
    }

    async atualizar(id: string, dadosAtualizados: Avaliacao): Promise<Avaliacao> {
        try {
            const avaliacaoExistente = await this.avaliacaoRepository.buscarPorId(id)
            if (!avaliacaoExistente) {
                throw new Error("[ERRO] Avaliação não encontrada para atualização")
            }

            if (
                !dadosAtualizados.getNota() &&
                !dadosAtualizados.getComentario() &&
                !dadosAtualizados.getDataAvaliacao()
            ) {
                return avaliacaoExistente
            }

            if (dadosAtualizados.getNota() === undefined || dadosAtualizados.getNota() === avaliacaoExistente.getNota()) {
                console.table(avaliacaoExistente)
                return avaliacaoExistente
            }

            // const notaAtualizada = Number(dadosAtualizados.getNota());
            // if (notaAtualizada !== undefined && (notaAtualizada < 1 || notaAtualizada > 5)) {
            //     throw new Error("[ERRO] A nota deve estar entre 1 e 5.")
            // }

            return await this.avaliacaoRepository.atualizar(id, dadosAtualizados)
        } catch (error) {
            console.error("[ERRO] Falha ao atualizar avaliação", error)
            throw new Error("Falha ao atualizar avaliação")
        }
    }
}
