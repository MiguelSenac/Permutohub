export class Usuario {
    private id?: number
    private usuario: string
    private nome: string
    private email: string
    private senha: string
    private perfil: string
    private avaliacao: number

    constructor(usuario = "", nome = "", email = "", senha = "", perfil = "", avaliacao:number = 1, id?: number) {
        this.id = id
        this.usuario = usuario
        this.nome = nome
        this.email = email
        this.senha = senha
        this.perfil = perfil
        this.avaliacao = avaliacao
    }

    getId(): number | undefined {
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

    
    getAvaliacao(): number { 
        return this.avaliacao
    }

    setId(id: number): void {
        this.id = id
    }

    setUsuario(usuario: string): void {
        this.usuario = usuario
    }

    setNome(nome: string): void {
        this.nome = nome
    }

    setEmail(email: string): void {
        this.email = email
    }

    setSenha(senha: string): void {
        this.senha = senha
    }

    setPerfil(perfil: string): void {
        this.perfil = perfil
    }

    setAvaliacao(avaliacao: number): void { 
        this.avaliacao = avaliacao
    }
}
