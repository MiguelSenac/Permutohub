import { Pool } from "pg"
import { Database } from "./Database"
import { Avaliacao } from "../entity/Avaliacao"
import { InterfaceRepository } from "./InterfaceRepository"

export class AvaliacaoRepository implements InterfaceRepository<Avaliacao> {
    
    private pool: Pool

    constructor() {
        this.pool = Database.iniciarConexao()
    }

    mapear(row: any): Avaliacao {
        return new Avaliacao( row.id_troca, row.nota, row.comentario, row.data_avaliacao, row.id)
    }

    async listar(): Promise<Avaliacao[]> {
        const query = "SELECT * FROM public.avaliacoes"
        const result = await this.pool.query(query)
        return result.rows.map(this.mapear)
    }

    async buscarPorId(id: number): Promise<Avaliacao | null> {
        const query = "SELECT * FROM public.avaliacoes WHERE id = $1"
        const result = await this.pool.query(query, [id])

        if (result.rows.length === 0) 
        return null
        
        return this.mapear(result.rows[0])
    }

    async inserir(entidade: Avaliacao): Promise<Avaliacao> {
        const query = "INSERT INTO public.avaliacoes (id_troca, nota, comentario, data_avaliacao) VALUES ($1, $2, $3, $4) RETURNING *"
        const result = await this.pool.query(query, [entidade.getIdTroca(), entidade.getNota(), entidade.getComentario(), entidade.getDataAvaliacao()])
        
        return this.mapear(result.rows[0])
    }

    async remover(id: number): Promise<boolean> {
        const query = "DELETE FROM public.avaliacoes WHERE id = $1"
        await this.pool.query(query, [id])
        return true
    }

    async atualizar(id: number, entidade: Avaliacao): Promise<Avaliacao> {
        const campos: string[] = []
        const valores: any[] = []
        let index = 1

        if (entidade.getNota()!== undefined) {
            campos.push("nota = $" + index)
            valores.push(entidade.getNota())
            index++
        }

        if (entidade.getComentario()) {
            campos.push("comentario = $" + index)
            valores.push(entidade.getComentario())
            index++
        }

        if (entidade.getDataAvaliacao()) {
            campos.push("data_avaliacao = $" + index)
            valores.push(entidade.getDataAvaliacao())
            index++
        }

        const query = "UPDATE public.avaliacoes SET " + campos.join(", ") + " WHERE id = $" + (valores.length + 1) + " RETURNING *"
        valores.push(id)

        const result = await this.pool.query(query, valores)
        return this.mapear(result.rows[0])
    }

    async calcularMediaAvaliacoesUsuario(id: number): Promise<number> {
        const query = `
            SELECT AVG(a.nota)::float as media
            FROM public.avaliacoes a
            JOIN public.trocas t ON a.id_troca = t.id
            WHERE t.id_usuario_ofertante = $1
        `
        const result = await this.pool.query(query, [id])
        return Number(result.rows[0].media) || 0
    }
    
    
}
