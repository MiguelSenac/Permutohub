import { Client, Pool } from "pg";
import { Database } from "./Database";
import { Usuario } from "../entity/Usuario";
export class UsuarioRepository {

    private pool: Pool

    constructor() {
        this.pool = Database.iniciarConexao()

    }


    private mapearUsuario(row: any): Usuario {
        return new Usuario(row.id_usuario, row.usuario_usuario, row.nome_usuario, row.email_usuario, row.senha_usuario, row.descricao_usuario)
    }


    async listarUsuarios(): Promise<Usuario[]> {
        try {
            const query = "SELECT * FROM public.usuarios"
            const result = await this.pool.query(query)

            const listarUsuarios: Usuario[] = []

            for (const row of result.rows) {
                const usuario = new Usuario(row.id_usuario, row.usuario_usuario, row.nome_usuario, row.email_usuario, row.senha_usuario, row.descricao_usuario);

                listarUsuarios.push(usuario)
            }

            return listarUsuarios

        } catch (error) {

            console.error("Erro ", error)
            throw new Error("Falha")
        }

    }


    async buscarUsuarioPorEmail(email: string): Promise<Usuario | null> {
        try {
            const query = "SELECT * from public.usuarios where email_usuario = $1"
            const result = await this.pool.query(query, [email])

            if (result.rows.length === 0) {
                return null
            }

            return this.mapearUsuario(result.rows[0])

        }
        catch (error) {
            console.error("Erro ", error)
            throw new Error("Falha")
        }

    }


    async buscarUsuarioPorId(id: string): Promise<Usuario | null> {
        try {
            const query = "SELECT * from public.usuarios where id_usuario = $1"
            const result = await this.pool.query(query, [id])

            if (result.rows.length === 0) {
                return null
            }

            return this.mapearUsuario(result.rows[0])

        }
        catch (error) {
            console.error("Erro ", error)
            throw new Error("Falha")
        }

    }


    async inserirUsuario(usuario: string, nome: string, email: string, senha: string, descricao: string): Promise<Usuario> {
        try {
            const query = "insert into public.usuarios (usuario_usuario, nome_usuario, email_usuario, senha_usuario, descricao_usuario) values ($1, $2, $3, $4) returning *"
            const result = await this.pool.query(query, [usuario, nome, email, senha, descricao])

            return this.mapearUsuario(result.rows[0])

        } 
        catch (error) {
            console.error("Erro ", error)
            throw new Error("Falha")

        }

    }


    async removerUsuario(email: string): Promise<string> {
        try {
            const query = "DELETE FROM usuarios WHERE email_usuario = $1"
            await this.pool.query(query, [email])
            return "Usuário removido com sucesso"
            
        } 
        catch (error) {
            console.error("Erro ", error)
            throw new Error("Falha")
            
        }
    }


    async atualizarUsuario(id: string, dadosAtualizados: { usuario?: string, nome?: string, email?: string, senha?: string, descricao?: string }): Promise<Usuario> {
        try {
            const campos: string[] = []
        const valores: any[] = []

        if (dadosAtualizados.usuario) {
            campos.push("usuario_usuario = $1")
            valores.push(dadosAtualizados.usuario)
        }

        if (dadosAtualizados.nome) {
            campos.push("nome_usuario = $2")
            valores.push(dadosAtualizados.nome)
        }

        if (dadosAtualizados.email) {
            campos.push("email_usuario = $3")
            valores.push(dadosAtualizados.email)
        }

        if (dadosAtualizados.senha) {
            campos.push("senha_usuario = $4")
            valores.push(dadosAtualizados.senha)
        }

        if (dadosAtualizados.descricao) {
            campos.push("descricao_usuario = $5")
            valores.push(dadosAtualizados.descricao)
        }

        if (campos.length === 0) {
            throw new Error
        }

        const query = "update public.usuarios SET " + campos.join(", ") + " where id_usuario = $" + (valores.length + 1) + " returning *"

        valores.push(id)

        const result = await this.pool.query(query, valores)

        return this.mapearUsuario(result.rows[0])
        } 
        catch (error) {
            console.error("Erro ", error)
            throw new Error("Falha")
        }
    }
}