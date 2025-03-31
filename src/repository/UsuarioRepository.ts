import { Pool } from "pg"
import { Database } from "./Database"
import { Usuario } from "../entity/Usuario"
import { InterfaceRepository } from "./InterfaceRepository"

export class UsuarioRepository implements InterfaceRepository<Usuario> {

    private pool: Pool

    constructor() {
        this.pool = Database.iniciarConexao()
    }

    mapear(row: any): Usuario {
        return new Usuario(row.usuario, row.nome, row.email, row.senha, row.perfil, row.id)
    }

    async listar(): Promise<Usuario[]> {
        const query = "SELECT * FROM public.usuarios"
        const result = await this.pool.query(query)
        return result.rows.map(this.mapear)
    }

    async buscarPorId(id: string): Promise<Usuario | null> {
        const query = "SELECT * FROM public.usuarios WHERE id = $1"
        const result = await this.pool.query(query, [id])

        if (result.rows.length === 0) return null

        return this.mapear(result.rows[0])
    }

    async inserir(entidade: Usuario): Promise<Usuario> {
        const query = "INSERT INTO public.usuarios (usuario, nome, email, senha, perfil) VALUES ($1, $2, $3, $4, $5) RETURNING *"
        const result = await this.pool.query(query, [
            entidade.getUsuario(),
            entidade.getNome(),
            entidade.getEmail(),
            entidade.getSenha(),
            entidade.getPerfil()
        ])

        return this.mapear(result.rows[0])
    }

    async remover(id: string): Promise<boolean> {
        const query = "DELETE FROM public.usuarios WHERE id = $1"
        await this.pool.query(query, [id])
        return true
    }

    async atualizar(id: string, entidade: Usuario): Promise<Usuario> {
        const campos: string[] = []
        const valores: any[] = []
        let index = 1

        if (entidade.getUsuario()) {
            campos.push("usuario = $" + index)
            valores.push(entidade.getUsuario())
            index++
        }

        if (entidade.getNome()) {
            campos.push("nome = $" + index)
            valores.push(entidade.getNome())
            index++
        }

        if (entidade.getEmail()) {
            campos.push("email = $" + index)
            valores.push(entidade.getEmail())
            index++
        }

        if (entidade.getSenha()) {
            campos.push("senha = $" + index)
            valores.push(entidade.getSenha())
            index++
        }

        if (entidade.getPerfil()) {
            campos.push("perfil = $" + index)
            valores.push(entidade.getPerfil())
            index++
        }

        const query = "UPDATE public.usuarios SET " + campos.join(", ") + " WHERE id = $" + (valores.length + 1) + " RETURNING *"
        valores.push(id)

        const result = await this.pool.query(query, valores)
        return this.mapear(result.rows[0])
    }

    async buscarPorEmail(email: string): Promise<Usuario | null> {
        const query = "SELECT * FROM public.usuarios WHERE email = $1"
        const result = await this.pool.query(query, [email])

        if (result.rows.length === 0) return null

        return this.mapear(result.rows[0])
    }
}
