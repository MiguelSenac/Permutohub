import { Troca } from "../entity/Troca"
import { TrocaRepository } from "../repository/TrocaRepository"
import { InterfaceService } from "./InterfaceService"
import { UsuarioRepository } from "../repository/UsuarioRepository"
import { ServicoRepository } from "../repository/ServicoRepository"

export class TrocaService implements InterfaceService<Troca> {
    private trocaRepository: TrocaRepository
    private usuarioRepository: UsuarioRepository
    private servicoRepository: ServicoRepository
    

    constructor() {
        this.trocaRepository = new TrocaRepository()
        this.usuarioRepository = new UsuarioRepository()
        this.servicoRepository = new ServicoRepository()
    }

    async listar(): Promise<Troca[]> {
        try {
            return await this.trocaRepository.listar()
        } 
        catch (error) {
            console.error("[ERRO] Falha ao listar trocas", error)
            throw new Error("Falha ao listar trocas")
        }
    }

    async buscarPorId(id: number): Promise<Troca | null> {
        try {
            return await this.trocaRepository.buscarPorId(id)
        } 
        catch (error) {
            console.error("[ERRO] Falha ao buscar troca por ID", error)
            throw new Error("Falha ao buscar troca por ID")
        }
    }

    async inserir(objeto: Troca): Promise<Troca> {
        try {
            if (!objeto.getIdUsuarioOfertante() || !objeto.getIdUsuarioReceptor() || !objeto.getIdServicoTrocado()) {
                throw new Error("[ERRO] Usuário ofertante, usuário receptor e serviço trocado são obrigatórios")
            }

            const ofertante = await this.usuarioRepository.buscarPorId(objeto.getIdUsuarioOfertante())
            const receptor = await this.usuarioRepository.buscarPorId(objeto.getIdUsuarioReceptor())

            if (!ofertante || !receptor) {
                throw new Error("[ERRO] Usuário ofertante ou receptor não existe")
            }
    
            const servico = await this.servicoRepository.buscarPorId(objeto.getIdServicoTrocado())
            if (!servico) {
                throw new Error("[ERRO] Serviço trocado não existe")
            }

            if (objeto.getIdUsuarioOfertante() === objeto.getIdUsuarioReceptor()) {
                throw new Error("[ERRO] Um usuário não pode trocar serviço consigo mesmo")
            }

            if (objeto.getIdUsuarioOfertante() != servico.getIdUsuario() && objeto.getIdUsuarioReceptor() != servico.getIdUsuario()) {
                throw new Error("[ERRO] Não é possivel trocar um serviço que não foi criado por uma das partes")
            }

            return await this.trocaRepository.inserir(objeto)
        } 
        catch (error) {
            console.error("[ERRO] Falha ao inserir troca", error)
            throw new Error("Falha ao inserir troca")
        }
    }

    async remover(id: number): Promise<boolean> {
        try {
            const trocaExistente = await this.trocaRepository.buscarPorId(id)
            if (!trocaExistente) {
                throw new Error("[ERRO] Nenhuma troca encontrada com esse ID")
            }

            return await this.trocaRepository.remover(id)
        } 
        catch (error) {
            console.error("[ERRO] Falha ao remover troca", error)
            throw new Error("Falha ao remover troca")
        }
    }

    async atualizar(id: number, dadosAtualizados: Troca): Promise<Troca> {
        try {
            const trocaExistente = await this.trocaRepository.buscarPorId(id)
            if (!trocaExistente) {
                throw new Error("[ERRO] Troca não encontrada para atualização")
            }

            const idUsuarioOfertante = dadosAtualizados.getIdUsuarioOfertante()
            const idUsuarioReceptor = dadosAtualizados.getIdUsuarioReceptor()
         

            if (idUsuarioOfertante === idUsuarioReceptor){
                throw new Error("[ERRO] Um usuário não pode trocar serviço consigo mesmo")
            }
           
            return await this.trocaRepository.atualizar(id, dadosAtualizados)
        } 
        catch (error) {
            console.error("[ERRO] Falha ao atualizar troca", error)
            throw new Error("Falha ao atualizar troca")
        }
    }
}
