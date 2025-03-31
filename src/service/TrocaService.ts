import { Troca } from "../entity/Troca"
import { TrocaRepository } from "../repository/TrocaRepository"
import { InterfaceService } from "./InterfaceService"

export class TrocaService implements InterfaceService<Troca> {
    private trocaRepository: TrocaRepository

    constructor() {
        this.trocaRepository = new TrocaRepository()
    }

    async listar(): Promise<Troca[]> {
        try {
            return await this.trocaRepository.listar()
        } catch (error) {
            console.error("[ERRO] Falha ao listar trocas", error)
            throw new Error("Falha ao listar trocas")
        }
    }

    async buscarPorId(id: string): Promise<Troca | null> {
        try {
            return await this.trocaRepository.buscarPorId(id)
        } catch (error) {
            console.error("[ERRO] Falha ao buscar troca por ID", error)
            throw new Error("Falha ao buscar troca por ID")
        }
    }

    async inserir(objeto: Troca): Promise<Troca> {
        try {
            if (!objeto.getIdUsuarioOfertante() || !objeto.getIdUsuarioReceptor() || !objeto.getIdServicoTrocado()) {
                throw new Error("[ERRO] Usuário ofertante, usuário receptor e serviço trocado são obrigatórios")
            }

            if (objeto.getIdUsuarioOfertante() === objeto.getIdUsuarioReceptor()) {
                throw new Error("[ERRO] Um usuário não pode trocar serviço consigo mesmo")
            }

            return await this.trocaRepository.inserir(objeto)
        } catch (error) {
            console.error("[ERRO] Falha ao inserir troca", error)
            throw new Error("Falha ao inserir troca")
        }
    }

    async remover(id: string): Promise<boolean> {
        try {
            const trocaExistente = await this.trocaRepository.buscarPorId(id)
            if (!trocaExistente) {
                throw new Error("[ERRO] Nenhuma troca encontrada com esse ID")
            }

            return await this.trocaRepository.remover(id)
        } catch (error) {
            console.error("[ERRO] Falha ao remover troca", error)
            throw new Error("Falha ao remover troca")
        }
    }

    async atualizar(id: string, dadosAtualizados: Troca): Promise<Troca> {
        try {
            const trocaExistente = await this.trocaRepository.buscarPorId(id)
            if (!trocaExistente) {
                throw new Error("[ERRO] Troca não encontrada para atualização")
            }

            const idUsuarioOfertante = dadosAtualizados.getIdUsuarioOfertante()
            const idUsuarioReceptor = dadosAtualizados.getIdUsuarioReceptor()
            const idServicoTrocado = dadosAtualizados.getIdServicoTrocado()
            const dataTrocaAtualizada = dadosAtualizados.getDataTroca()

            if (idUsuarioOfertante.trim() !== "" && idUsuarioReceptor.trim() !== "" && 
                idUsuarioOfertante === idUsuarioReceptor) {
                throw new Error("[ERRO] Um usuário não pode trocar serviço consigo mesmo")
            }

            if (
                idUsuarioOfertante.trim() === "" &&
                idUsuarioReceptor.trim() === "" &&
                idServicoTrocado.trim() === "" &&
                dataTrocaAtualizada.toISOString() === trocaExistente.getDataTroca().toISOString()
            ) {
                return trocaExistente
            }

            return await this.trocaRepository.atualizar(id, dadosAtualizados)
        } catch (error) {
            console.error("[ERRO] Falha ao atualizar troca", error)
            throw new Error("Falha ao atualizar troca")
        }
    }
}
