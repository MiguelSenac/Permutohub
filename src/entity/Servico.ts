export class Servico {
    private id?: string
    private idUsuario: string
    private titulo: string
    private descricao: string
    private data: string
    private ativo: boolean

    constructor(idUsuario = "", titulo = "", descricao = "", data = "", ativo: boolean = true, idServico?: string) {
        this.id = idServico
        this.idUsuario = idUsuario
        this.titulo = titulo
        this.descricao = descricao
        this.data = data
        this.ativo = ativo
    }
    

    
    public getId(): string | undefined {
        return this.id
    }

    public getIdUsuario(): string {
        return this.idUsuario
    }

    public getTitulo(): string {
        return this.titulo
    }

    public getDescricao(): string {
        return this.descricao
    }

    public getData(): string {
        return this.data
    }

    public getAtivo(): boolean {
        return this.ativo
    }

    
    public setId(idServico: string): void {
        this.id = idServico
    }

    public setIdUsuario(idUsuario: string): void {
        this.idUsuario = idUsuario
    }

    public setTitulo(titulo: string): void {
        this.titulo = titulo
    }

    public setDescricao(descricao: string): void {
        this.descricao = descricao
    }

    public setData(data: string): void {
        this.data = data
    }

    public setAtivo(ativo: boolean): void {
        this.ativo = ativo
    }
}
