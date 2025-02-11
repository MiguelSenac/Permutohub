export class Oferta{
    private id: string
    private usuarioId: string
    private descricao: string
    private habilidadesRequeridas: string[]
    private status: "ativa" | "concluída"

    constructor(id: string, usuarioId: string, descricao: string, habilidadesRequeridas: string[], status: "ativa" | "concluída"){
        this.id = id
        this.usuarioId = usuarioId
        this.descricao = descricao
        this.habilidadesRequeridas = habilidadesRequeridas
        this.status = status
    }

    public criarOferta(): void{}
    public editarOferta(): void{}
    public removerOFerta(): void{}
}