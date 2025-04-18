import { Pool } from "pg"
import { Database } from "./Database"
import { Troca } from "../entity/Troca"
import { InterfaceRepository } from "./InterfaceRepository"

export class TrocaRepository implements InterfaceRepository<Troca> {
    private pool: Pool

    constructor() {
        this.pool = Database.iniciarConexao()
    }

    mapear(row: any): Troca {
        return new Troca(row.id_usuario_ofertante, row.id_usuario_receptor, row.id_servico_trocado, row.data_troca, row.id)
    }

    async listar(): Promise<Troca[]> {
        const query = `
            SELECT 
                t.id AS troca_id,
                u_ofertante.id AS id_ofertante,
                u_ofertante.nome AS nome_ofertante,
                u_receptor.id AS id_receptor,
                u_receptor.nome AS nome_receptor,
                s.id AS id_servico,
                s.titulo AS titulo_servico,
                t.data_troca
            FROM 
                public.trocas t
            JOIN 
                public.usuarios u_ofertante ON t.id_usuario_ofertante = u_ofertante.id
            JOIN 
                public.usuarios u_receptor ON t.id_usuario_receptor = u_receptor.id
            JOIN 
                public.servicos s ON t.id_servico_trocado = s.id;
        `
        
        const result = await this.pool.query(query)
        return result.rows
    }
    

    async buscarPorId(id: number): Promise<Troca | null> {
        const query = "SELECT * FROM public.trocas WHERE id = $1"
        const result = await this.pool.query(query, [id])
        
        if (result.rows.length === 0) return null
        
        return this.mapear(result.rows[0])
    }

    async inserir(entidade: Troca): Promise<Troca> {
        const query = "INSERT INTO public.trocas (id_usuario_ofertante, id_usuario_receptor, id_servico_trocado, data_troca) VALUES ($1, $2, $3, $4) RETURNING *"
        const result = await this.pool.query(query, [entidade.getIdUsuarioOfertante(), entidade.getIdUsuarioReceptor(), entidade.getIdServicoTrocado(), entidade.getDataTroca()])
        
        return this.mapear(result.rows[0])
    }

    async remover(id: number): Promise<boolean> {
        const query = "DELETE FROM public.trocas WHERE id = $1"
        await this.pool.query(query, [id])
        return true
    }

    async atualizar(id: number, entidade: Troca): Promise<Troca> {
        const campos: string[] = []
        const valores: any[] = []
        let index = 1

        if (entidade.getIdUsuarioOfertante()) {
            campos.push("id_usuario_ofertante = $" + index)
            valores.push(entidade.getIdUsuarioOfertante())
            index++
        }

        if (entidade.getIdUsuarioReceptor()) {
            campos.push("id_usuario_receptor = $" + index)
            valores.push(entidade.getIdUsuarioReceptor())
            index++
        }

        if (entidade.getIdServicoTrocado()) {
            campos.push("id_servico_trocado = $" + index)
            valores.push(entidade.getIdServicoTrocado())
            index++
        }

        if (entidade.getDataTroca()) {
            campos.push("data_troca = $" + index)
            valores.push(entidade.getDataTroca())
            index++
        }

        const query = "UPDATE public.trocas SET " + campos.join(", ") + " WHERE id = $" + (valores.length + 1) + " RETURNING *"
        valores.push(id)

        const result = await this.pool.query(query, valores)
        return this.mapear(result.rows[0])
    }
}
