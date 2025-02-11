export class Notificacao{
    private id: string
    private usuarioId: string
    private mensagem: string
    private status: "lida"|"não lida"

    constructor(private id: string, private usuarioId: string, private mensagem: string, private status: "lida"|"não lida"){
        this.id = id
        this.usuarioId = usuarioId
        this.mensagem = mensagem
        this.status = status
    }

    static criarNotificacao(usuarioId: string, mensagem: string): Notificacao{}
    public marcarComoLida(): void{}

}