import { Avaliacao } from "../entity/Avaliacao"
import { AvaliacaoRepository } from "../repository/AvaliacaoRepository"
import { InterfaceService } from "./InterfaceService"
import { TrocaRepository } from "../repository/TrocaRepository"
import { UsuarioRepository } from "../repository/UsuarioRepository"


export class AvaliacaoService implements InterfaceService<Avaliacao> {
    private avaliacaoRepository: AvaliacaoRepository
    private trocaRepository: TrocaRepository
    private usuarioRepository: UsuarioRepository

    constructor() {
        this.avaliacaoRepository = new AvaliacaoRepository()
        this.trocaRepository = new TrocaRepository()
        this.usuarioRepository = new UsuarioRepository()
    }

    async listar(): Promise<Avaliacao[]> {
        try {
            return await this.avaliacaoRepository.listar()
        }
        catch (error) {
            console.error("[ERRO] Falha ao listar avaliações", error)
            throw new Error("Falha ao listar avaliações")
        }
    }

    async buscarPorId(id: number): Promise<Avaliacao | null> {
        try {
            return await this.avaliacaoRepository.buscarPorId(id)
        }
        catch (error) {
            console.error("[ERRO] Falha ao buscar avaliação por ID", error)
            throw new Error("Falha ao buscar avaliação por ID")
        }
    }

    async inserir(objeto: Avaliacao): Promise<Avaliacao> {
        try {
            if (!objeto.getIdTroca() || objeto.getNota() === undefined) {
                throw new Error("[ERRO] ID da troca e nota são obrigatórios")
            }

            const trocaExistente = await this.trocaRepository.buscarPorId(objeto.getIdTroca())

            if (!trocaExistente) {
                throw new Error("[ERRO] A troca informada não existe")
            }

            if (objeto.getNota() < 1 || objeto.getNota() > 5) {
                throw new Error("[ERRO] A nota deve estar entre 1 e 5")
            }
           
            const novaAvaliacao = await this.avaliacaoRepository.inserir(objeto)
            const idOfertante = trocaExistente.getIdUsuarioOfertante()
            const mediaAvaliacoes = await this.avaliacaoRepository.calcularMediaAvaliacoesUsuario(idOfertante)
            
            const usuario = await this.usuarioRepository.buscarPorId(idOfertante);
            if (usuario) {
                usuario.setAvaliacao(mediaAvaliacoes);
                await this.usuarioRepository.atualizar(idOfertante, usuario);
            }
            
            return novaAvaliacao
        }
        catch (error) {
            console.error("[ERRO] Falha ao inserir avaliação", error)
            throw new Error("Falha ao inserir avaliação")
        }
    }

    async remover(id: number): Promise<boolean> {
        try {
            const avaliacaoExistente = await this.avaliacaoRepository.buscarPorId(id)
            if (!avaliacaoExistente) {
                throw new Error("[ERRO] Nenhuma avaliação encontrada com esse ID")
            }

            return await this.avaliacaoRepository.remover(id)
        }
        catch (error) {
            console.error("[ERRO] Falha ao remover avaliação", error)
            throw new Error("Falha ao remover avaliação")
        }
    }

    async atualizar(id: number, dadosAtualizados: Avaliacao): Promise<Avaliacao> {
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


            return await this.avaliacaoRepository.atualizar(id, dadosAtualizados)
        }
        catch (error) {
            console.error("[ERRO] Falha ao atualizar avaliação", error)
            throw new Error("Falha ao atualizar avaliação")
        }
    }
}
