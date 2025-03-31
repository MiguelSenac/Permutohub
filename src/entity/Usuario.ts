export class Usuario {
    private id?: string
    private usuario: string
    private nome: string
    private email: string
    private senha: string
    private perfil: string

    constructor(usuario = "", nome = "", email = "", senha = "", perfil = "", id?: string) {
        this.id = id
        this.usuario = usuario
        this.nome = nome
        this.email = email
        this.senha = senha
        this.perfil = perfil
    }

    getId(): string | undefined {
        return this.id
    }

    getUsuario(): string {
        return this.usuario
    }

    getNome(): string {
        return this.nome
    }

    getEmail(): string {
        return this.email
    }

    getSenha(): string {
        return this.senha
    }

    getPerfil(): string {
        return this.perfil
    }

    setId(id: string) {
        this.id = id
    }

    setUsuario(usuario: string) {
        this.usuario = usuario
    }

    setNome(nome: string) {
        this.nome = nome
    }

    setEmail(email: string) {
        this.email = email
    }

    setSenha(senha: string) {
        this.senha = senha
    }

    setPerfil(perfil: string) {
        this.perfil = perfil
    }
}
