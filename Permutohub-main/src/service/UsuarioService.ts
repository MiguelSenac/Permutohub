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

    async buscarUsuarioPorEmail(email: string): Promise<Usuario | null> {
      
        return await this.usuarioRepository.buscarUsuarioPorEmail(email)
    }

    async inserirUsuario(usuario:string, nome:string, email:string, senha:string, descricao:string): Promise<Usuario>{
        if(!usuario || !nome || !email || !senha){
            throw new Error("[ERRO] Usuário, nome, e-mail e senha são obrigatórios")
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(email)){
            throw new Error("[ERRO] Digite um e-mail valido")
        }
        
        const usuarioExistente = await this.usuarioRepository.buscarUsuarioPorEmail(email)
        if(usuarioExistente){
            throw new Error ("[ERRO] Já existe um usuário cadastrado com esse e-mail")
        }

        const senhaRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!senhaRegex.test(senha)) {
            throw new Error("[ERRO] A senha deve conter no mínimo 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial")
        }

        usuario = usuario.trim()
        nome = nome.trim()
        email = email.trim()
        descricao = descricao.trim()

        return this.usuarioRepository.inserirUsuario(usuario, nome, email, senha, descricao)
    }

    async removerUsuario(email:string){

        const usuarioExistente = await this.usuarioRepository.buscarUsuarioPorEmail(email)
        if(!usuarioExistente){
            throw new Error("[ERRO] Nenhum usuário encontrado com esse e-mail")
        }

        return this.usuarioRepository.removerUsuario(email)
    }

    async atualizarUsuario(id: string, dadosAtualizados: { usuario?: string, nome?: string, email?: string, senha?: string, descricao?: string }): Promise<Usuario>{
        
        const usuarioExistente = await this.usuarioRepository.buscarUsuarioPorId(id)
        if(!usuarioExistente){
            throw new Error("[ERRO] Usuário não encontrado para atualização")
        }

        if(dadosAtualizados.email){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!emailRegex.test(dadosAtualizados.email))
                throw new Error("[ERRO] Digite um e-mail válido")
        }

        
        if(dadosAtualizados.senha){
            const senhaRegex =  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            if(!senhaRegex.test(dadosAtualizados.senha))
                throw new Error("[ERRO] A senha deve conter no mínimo 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial")
        }

        return this.usuarioRepository.atualizarUsuario(id, dadosAtualizados)
    }

}




 