import { Servico } from "../entity/Servico"
import { ServicoRepository } from "../repository/ServicoRepository"


export class ServicoService {

    private servicoRepository: ServicoRepository

    constructor() {
        this.servicoRepository = new ServicoRepository()
    }

    async listarServicos(): Promise<Servico[]> {
        return await this.servicoRepository.listarServicos()
    }

    async listarServicosPorUsuario(idUsuario: string): Promise<Servico[] | null> {
        return await this.servicoRepository.listarServicosPorUsuario(idUsuario)
    }

    async buscarServicoPorId(id: string): Promise<Servico | null> {

        return await this.servicoRepository.buscarServicoPorId(id)
    }

    async inserirServico(idUsuario: string, titulo: string, descricao: string, data: Date, ativo: boolean = true): Promise<Servico> {
        return this.servicoRepository.inserirServico(idUsuario, titulo, descricao, data)
    }

    async removerServico(id: string) {

        return this.servicoRepository.removerServico(id)
    }

    async atualizarServico(id: string, dadosAtualizados: { titulo?: string, descricao?: string, data?: Date, ativo?: boolean }): Promise<Servico> {

        return this.servicoRepository.atualizarServico(id, dadosAtualizados)

    }

















}