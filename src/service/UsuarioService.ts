import { Usuario } from "../entity/Usuario"
import { UsuarioRepository } from "../repository/UsuarioRepository"
import { InterfaceService } from "./InterfaceService"

export class UsuarioService implements InterfaceService<Usuario> {
    private usuarioRepository: UsuarioRepository

    constructor() {
        this.usuarioRepository = new UsuarioRepository()
    }

    async listar(): Promise<Usuario[]> {
        try {
            return await this.usuarioRepository.listar()
        } catch (error) {
            console.error("[ERRO] Falha ao listar usuários", error)
            throw new Error("Falha ao listar usuários")
        }
    }

    async buscarPorId(id: string): Promise<Usuario | null> {
        try {
            return await this.usuarioRepository.buscarPorId(id)
        } catch (error) {
            console.error("[ERRO] Falha ao buscar usuário por ID", error)
            throw new Error("Falha ao buscar usuário por ID")
        }
    }

    async inserir(objeto: Usuario): Promise<Usuario> {
        try {
            if (!objeto.getUsuario() || !objeto.getNome() || !objeto.getEmail() || !objeto.getSenha()) {
                throw new Error("[ERRO] Usuário, nome, e-mail e senha são obrigatórios")
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(objeto.getEmail())) {
                throw new Error("[ERRO] Digite um e-mail válido")
            }

            const usuarioExistente = await this.usuarioRepository.buscarPorEmail(objeto.getEmail())
            if (usuarioExistente) {
                throw new Error("[ERRO] Já existe um usuário cadastrado com esse e-mail")
            }

            const senhaRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?/~`]).{8,}$/
            if (!senhaRegex.test(objeto.getSenha())) {
                throw new Error("[ERRO] A senha deve conter no mínimo 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial")
            }

            return await this.usuarioRepository.inserir(objeto)
        } catch (error) {
            console.error("[ERRO] Falha ao inserir usuário", error)
            throw new Error("Falha ao inserir usuário")
        }
    }

    async remover(id: string): Promise<boolean> {
        try {
            const usuarioExistente = await this.usuarioRepository.buscarPorId(id)
            if (!usuarioExistente) {
                throw new Error("[ERRO] Nenhum usuário encontrado com esse ID")
            }

            return await this.usuarioRepository.remover(id)
        } catch (error) {
            console.error("[ERRO] Falha ao remover usuário", error)
            throw new Error("Falha ao remover usuário")
        }
    }

    async atualizar(id: string, dadosAtualizados: Usuario): Promise<Usuario> {
        try {
            const usuarioExistente = await this.usuarioRepository.buscarPorId(id)
            if (!usuarioExistente) {
                throw new Error("[ERRO] Usuário não encontrado para atualização")
            }

            if (
                !dadosAtualizados.getUsuario() &&
                !dadosAtualizados.getNome() &&
                !dadosAtualizados.getEmail() &&
                !dadosAtualizados.getSenha() &&
                !dadosAtualizados.getPerfil()
            ) {
                return usuarioExistente 
            }

            if (dadosAtualizados.getEmail()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailRegex.test(dadosAtualizados.getEmail())) {
                    throw new Error("[ERRO] Digite um e-mail válido")
                }

                const usuarioComEmailExistente = await this.usuarioRepository.buscarPorEmail(dadosAtualizados.getEmail())
                if (usuarioComEmailExistente && usuarioComEmailExistente.getId() !== id) {
                    throw new Error("[ERRO] Já existe um usuário cadastrado com esse e-mail")
                }
            }

            if (dadosAtualizados.getSenha()) {
                const senhaRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?/~`]).{8,}$/
                if (!senhaRegex.test(dadosAtualizados.getSenha())) {
                    throw new Error("[ERRO] A senha deve conter no mínimo 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial")
                }
            }

            return await this.usuarioRepository.atualizar(id, dadosAtualizados)
        } catch (error) {
            console.error("[ERRO] Falha ao atualizar usuário", error)
            throw new Error("Falha ao atualizar usuário")
        }
    }
}
