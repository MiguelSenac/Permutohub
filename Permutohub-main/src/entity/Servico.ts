export class Servico{
    private idServico: string
    private idUsuario: string
    private titulo: string
    private descricao: string
    private data: Date
    private ativo: boolean

    constructor(idServico: string, idUsuario: string, titulo: string, descricao: string, data: Date, ativo: boolean = true ){
        this.idServico = idServico
        this.idUsuario = idUsuario
        this.titulo = titulo
        this.descricao = descricao
        this.data = data
        this.ativo = ativo

    }

    
}