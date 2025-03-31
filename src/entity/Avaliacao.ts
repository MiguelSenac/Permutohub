export class Avaliacao {
    private id?: string
    private idTroca: string
    private nota: string
    private comentario: string
    private dataAvaliacao: string 

    constructor(idTroca = "", nota = "", comentario = "", dataAvaliacao = "", id?: string) {
        this.id = id
        this.idTroca = idTroca
        this.nota = nota
        this.comentario = comentario
        this.dataAvaliacao = dataAvaliacao  
    }

    public getId(): string | undefined {
        return this.id
    }

    public getIdTroca(): string {
        return this.idTroca
    }

    public getNota(): string {
        return this.nota
    }

    public getComentario(): string {
        return this.comentario
    }

    public getDataAvaliacao(): string {
        return this.dataAvaliacao
    }

    public setId(id: string): void {
        this.id = id
    }

    public setIdTroca(idTroca: string): void {
        this.idTroca = idTroca
    }

    public setNota(nota: string): void {
        this.nota = nota
    }

    public setComentario(comentario: string): void {
        this.comentario = comentario
    }

    public setDataAvaliacao(dataAvaliacao: string): void {
        this.dataAvaliacao = dataAvaliacao
    }
}
