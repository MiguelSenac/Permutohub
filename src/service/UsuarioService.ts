import { Usuario } from "../entity/Usuario"
import { UsuarioRepository } from "../repository/UsuarioRepository"

export class UsuarioService {

    private usuarioRepository: UsuarioRepository

    constructor() {
        this.usuarioRepository = new UsuarioRepository()
    }

    async listarUsuarios(): Promise<Usuario[]> {
        return await this.usuarioRepository.listarUsuarios()
    }

    async buscarUsuarioPorEmail(email: string): Promise<Usuario[]> {
      
        return await this.usuarioRepository.buscarUsuarioPorEmail(email)

        
    }

    async inserirUsuario(nome:string, email:string, senha:string, descricao:string): Promise<Usuario>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(email)){
            throw new Error("[ERRO] Digite um e-mail valido")
        }
        return this.usuarioRepository.inserirUsuario(nome, email, senha, descricao)
    }

    async removerUsuario(email:string){
        return this.usuarioRepository.removerUsuario(email)
    }

}




