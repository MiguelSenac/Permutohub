import { Client, Pool } from "pg";
import { Database } from "./Database";
import { Usuario } from "../entity/Usuario";
export class UsuarioRepository {

    private pool: Pool

    constructor() {
        this.pool = Database.iniciarConexao()

    }

    async listarUsuarios(): Promise<Usuario[]> {

        const query = "SELECT * FROM public.usuarios"
        const result = await this.pool.query(query)

        const listarUsuarios: Usuario[] = []

        for (const row of result.rows) {
            const usuario = new Usuario(row.id_usuario, row.nome_usuario, row.email_usuario, row.senha_usuario, row.descricao_usuario);

            listarUsuarios.push(usuario)
        }

        return listarUsuarios

    }


    async buscarUsuarioPorEmail(email: string): Promise<Usuario[]> {
        const query = "SELECT * from public.usuarios where email_usuario = $1"
        const result = await this.pool.query(query, [email])

        const listarUsuarios: Usuario[] = []

        for (const row of result.rows) {
            const usuario = new Usuario(row.id_usuario, row.nome_usuario, row.email_usuario, row.senha_usuario, row.descricao_usuario)
            listarUsuarios.push(usuario)
        }
        return listarUsuarios
    }

    async inserirUsuario(nome: string, email: string, senha: string, descricao: string): Promise<Usuario> {
        const query = "insert into public.usuarios (nome_usuario, email_usuario, senha_usuario, descricao_usuario) values ($1, $2, $3, $4) returning *"
        const result = await this.pool.query(query, [nome, email, senha, descricao])
        const row = result.rows[0]
        return new Usuario(row.id_usuario, row.nome_usuario, row.email_usuario, row.senha_usuario, row.descricao_usuario)

    }

    async removerUsuario(email: string):Promise<string>{
        const query = "DELETE FROM usuarios WHERE email_usuario = $1"
        await this.pool.query(query,[email])
        return "Usuário removido com sucesso"
    }

    
        

}