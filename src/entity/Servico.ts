export class Servico {
    private id?: number
    private idUsuario: number
    private titulo: string
    private descricao: string
    private data: string
    private ativo: boolean

    constructor(idUsuario = 0, titulo = "", descricao = "", data = "", ativo: boolean = true, idServico?: number) {
        this.id = idServico
        this.idUsuario = idUsuario
        this.titulo = titulo
        this.descricao = descricao
        this.data = data
        this.ativo = ativo
    }
    
    public getId(): number | undefined {
        return this.id
    }

    public getIdUsuario(): number {
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
    
    public setId(idServico: number): void {
        this.id = idServico
    }

    public setIdUsuario(idUsuario: number): void {
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
