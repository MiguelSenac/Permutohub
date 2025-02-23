import { Pool } from "pg"
import { Database } from "./Database"
import { Servico } from "../entity/Servico"
import { Usuario } from "../entity/Usuario"

export class ServicoRepository {

    private pool: Pool

    constructor() {
        this.pool = Database.iniciarConexao()
    }

    private mapearServico(row: any): Servico {
        return new Servico(row.id_servico, row.id_usuario, row.titulo_servico, row.descricao_servico, new Date(row.data_servico), row.ativo)

    }

    async listarServicos(): Promise<Servico[]> {
        try {
            const query = "select * from public.servicos"
            const result = await this.pool.query(query)
            return result.rows.map(this.mapearServico)
        }

        catch (error) {
            console.error("Erro " + error)
            throw new Error("Falha")
        }
    }

    async listarServicosPorUsuario(idUsuario: string): Promise<Servico[]> {
        try {
            const query = "select * from public.servicos where id_usuario = $1"
            const result = await this.pool.query(query, [idUsuario])

            return result.rows.map(this.mapearServico)
        }

        catch (error) {
            console.error("Erro " + error)
            throw new Error("Falha ao buscar serviços do usuário")
        }
    }

    async buscarServicoPorId(id: string): Promise<Servico | null> {
        try {
            const query = "select * from public.servico where id_servico = $1"
            const result = await this.pool.query(query, [id])

            if (result.rows.length === 0) {
                return null
            }

            return this.mapearServico(result.rows[0])
        }

        catch (error) {
            console.error("Erro " + error)
            throw new Error("Falha")
        }
    }

    async inserirServico(idUsuario: string, titulo: string, descricao: string, data: Date, ativo: boolean = true): Promise<Servico> {
        try {
            const query = "insert into public.servico (id_usuario, titulo_servico, descricao_servico, data_servico, ativo) values($1, $2, $3, $4, $5) returning*"
            const reult = await this.pool.query(query, [idUsuario, titulo, descricao, data, ativo])
            return this.mapearServico(reult.rows[0])
        }

        catch (error) {
            console.error("Erro " + error)
            throw new Error("Falha")
        }
    }

    async removerServico(id: string): Promise<string> {
        try {
            const query = "delete from public.servicos WHERE id_servico = $1"
            await this.pool.query(query, [id])
            return "Serviço removido com sucesso"
        }

        catch (error) {
            console.error("Erro " + error)
            throw new Error("Falha")
        }
    }


    async atualizarServico(id: string, dadosAtualizados: { titulo?: string, descricao?: string, data?: Date, ativo?: boolean }): Promise<Servico> {
        try {
            const campos: string[] = []
            const valores: any[] = []
            let index = 1

            if (dadosAtualizados.titulo) {
                campos.push("titulo_servico = $" + index)
                valores.push(dadosAtualizados.titulo)
                index++
            }
            if (dadosAtualizados.descricao) {
                campos.push("descricao_servico = $$" + index)
                valores.push(dadosAtualizados.descricao)
                index++
            }
            if (dadosAtualizados.data) {
                campos.push("data_servico = $$" + index)
                valores.push(dadosAtualizados.data)
                index++
            }
            if (dadosAtualizados.ativo !== undefined) {
                campos.push("ativo = $" + index)
                valores.push(dadosAtualizados.ativo)
                index++
            }

            if (campos.length === 0) {
                throw new Error
            }

            const query = "update public.servicos set " + campos.join(", ") + " where id_servico = $" + (valores.length + 1) + " returning *"
            valores.push(id)

            const result = await this.pool.query(query, valores)

            return this.mapearServico(result.rows[0])
        }

        catch (error) {
            console.error("Erro " + error)
            throw new Error("Falha")
        }
    }
}