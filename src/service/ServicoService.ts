import { Servico } from "../entity/Servico"
import { ServicoRepository } from "../repository/ServicoRepository"
import { InterfaceService } from "./InterfaceService"
import { UsuarioRepository } from "../repository/UsuarioRepository"

export class ServicoService implements InterfaceService<Servico> {

    private servicoRepository: ServicoRepository
    private usuarioRepository: UsuarioRepository

    constructor() {
        this.servicoRepository = new ServicoRepository()
        this.usuarioRepository = new UsuarioRepository()
    }

    async listar(): Promise<Servico[]> {
        try {
            return await this.servicoRepository.listar()
        } 
        catch (error) {
            console.error("[ERRO] Falha ao listar serviços", error)
            throw new Error("Falha ao listar serviços")
        }
    }

    async listarPorUsuario(idUsuario: string): Promise<Servico[] | null> {
        try {
            if (!idUsuario || idUsuario.trim() === "") {
                throw new Error("ID do usuário inválido.")
            }
        
            return await this.servicoRepository.listarPorUsuario(idUsuario)
        } 
        catch (error) {
            console.error("[ERRO] Falha ao listar serviços por usuário", error)
            throw new Error("Falha ao listar serviços por usuário")
        }
    }

    async buscarPorId(id: number): Promise<Servico | null> {
        try {
            return await this.servicoRepository.buscarPorId(id)
        } 
        catch (error) {
            console.error("[ERRO] Falha ao buscar serviço por ID", error)
            throw new Error("Falha ao buscar serviço por ID")
        }
    }

    async inserir(objeto: Servico): Promise<Servico> {
        try {
            if (!objeto.getIdUsuario()) {
                throw new Error("ID do usuário não pode ser vazio.")
            }

            const usuarioExiste = await this.usuarioRepository.buscarPorId(objeto.getIdUsuario())
            if (!usuarioExiste) {
                throw new Error("Usuário não encontrado.")
            }

            if (objeto.getTitulo().trim().length < 3) {
                throw new Error("O título deve ter pelo menos 3 caracteres.")
            }

            if (objeto.getDescricao().trim().length < 10) {
                throw new Error("A descrição deve ter pelo menos 10 caracteres.")
            }

            return await this.servicoRepository.inserir(objeto)
        } 
        catch (error) {
            console.error("[ERRO] Falha ao inserir serviço", error)
            throw new Error("Falha ao inserir serviço")
        }
    }

    async remover(id: number): Promise<boolean> {
        try {
            const servicoExistente = await this.servicoRepository.buscarPorId(id)
            
            if (!servicoExistente) {
                throw new Error("Serviço não encontrado.")
            }
        
            return await this.servicoRepository.remover(id)
        } 
        catch (error) {
            console.error("[ERRO] Falha ao remover serviço", error)
            throw new Error("Falha ao remover serviço")
        }
    }

    async atualizar(id: number, dadosAtualizados: Servico): Promise<Servico> {
        try {
            const servicoExistente = await this.servicoRepository.buscarPorId(id)
            if (!servicoExistente) {
                throw new Error("Serviço não encontrado.")
            }

            if (dadosAtualizados.getTitulo() && dadosAtualizados.getTitulo().trim().length < 3) {
                throw new Error("O título deve ter pelo menos 3 caracteres.")
            }

            if (dadosAtualizados.getDescricao() && dadosAtualizados.getDescricao().trim().length < 10) {
                throw new Error("A descrição deve ter pelo menos 10 caracteres.")
            }

            return await this.servicoRepository.atualizar(id, dadosAtualizados)
        } 
        catch (error) {
            console.error("[ERRO] Falha ao atualizar serviço", error)
            throw new Error("Falha ao atualizar serviço")
        }
    }
}
