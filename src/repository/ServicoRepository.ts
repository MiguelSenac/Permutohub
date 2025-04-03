import { Pool } from "pg"
import { Database } from "./Database"
import { Servico } from "../entity/Servico"
import { Usuario } from "../entity/Usuario"
import { InterfaceRepository } from "./InterfaceRepository"

export class ServicoRepository implements InterfaceRepository<Servico> {

    private pool: Pool

    constructor() {
        this.pool = Database.iniciarConexao()
    }

    mapear(row: any): Servico {
        return new Servico(row.id_usuario, row.titulo, row.descricao, row.data_publicacao, row.ativo, row.id);
    }

    async listar(): Promise<Servico[]> {
        const query = "select * from public.servicos"
        const result = await this.pool.query(query)
        return result.rows.map(this.mapear)
    }

    async listarPorUsuario(idUsuario: string): Promise<Servico[]> {
        const query = "select * from public.servicos where id_usuario = $1"
        const result = await this.pool.query(query, [idUsuario])
        return result.rows.map(this.mapear)
    }

    async buscarPorId(id: number): Promise<Servico | null> {
        const query = "select * from public.servicos where id = $1"
        const result = await this.pool.query(query, [id])

        if (result.rows.length === 0) {
            return null
        }

        return this.mapear(result.rows[0])
    }

    async inserir(entidade: Servico): Promise<Servico> {
        const query = "insert into public.servicos (id_usuario, titulo, descricao, data_publicacao, ativo) values($1, $2, $3, $4, $5) returning*"
        const result = await this.pool.query(query, [entidade.getIdUsuario(), entidade.getTitulo(), entidade.getDescricao(), entidade.getData(), entidade.getAtivo()])

        return this.mapear(result.rows[0])
    }

    async remover(id: number): Promise<boolean> {
        const query = "delete from public.servicos WHERE id = $1"
        await this.pool.query(query, [id])
        return true
    }

    async atualizar(id: number, entidade: Servico): Promise<Servico> {
        const campos: string[] = []
        const valores: any[] = []
        let index = 1

        if (entidade.getTitulo()) {
            campos.push("titulo = $" + index)
            valores.push(entidade.getTitulo())
            index++
        }
        if (entidade.getDescricao()) {
            campos.push("descricao = $" + index)
            valores.push(entidade.getDescricao())
            index++
        }
        if (entidade.getData()) {
            campos.push("data_publicacao = $" + index)
            valores.push(entidade.getData())
            index++
        }
        if (entidade.getAtivo() !== undefined) {
            campos.push("ativo = $" + index)
            valores.push(entidade.getAtivo())
            index++
        }

        const query = "update public.servicos set " + campos.join(", ") + " where id = $" + (valores.length + 1) + " returning *"
        valores.push(id)

        const result = await this.pool.query(query, valores)

        return this.mapear(result.rows[0])
    }
}
