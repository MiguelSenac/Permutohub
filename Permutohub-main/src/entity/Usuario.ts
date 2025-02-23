export class Usuario {
    private id: string
    private usuario: string
    private nome: string
    private email: string
    private senha: string
    private descricao: string


    constructor(id: string, usuario: string, nome: string, email: string, senha: string, descricao: string) {
        this.id = id
        this.usuario = usuario
        this.nome = nome
        this.email = email
        this.senha = senha
        this.descricao = descricao
    }

}