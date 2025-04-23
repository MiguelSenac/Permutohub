export class Avaliacao {
    private id?: number
    private idTroca: number
    private nota: number
    private comentario: string
    private dataAvaliacao: string

    constructor(idTroca = 0, nota = 1, comentario = "", dataAvaliacao = "", id?: number) {
        this.id = id
        this.idTroca = idTroca
        this.nota = nota
        this.comentario = comentario
        this.dataAvaliacao = dataAvaliacao  
    }

    public getId(): number | undefined {
        return this.id
    }

    public getIdTroca(): number {
        return this.idTroca
    }

    public getNota(): number {
        return this.nota
    }

    public getComentario(): string {
        return this.comentario
    }

    public getDataAvaliacao(): string {
        return this.dataAvaliacao
    }

    public setId(id: number): void {
        this.id = id
    }

    public setIdTroca(idTroca: number): void {
        this.idTroca = idTroca
    }

    public setNota(nota: number): void {
        this.nota = nota
    }

    public setComentario(comentario: string): void {
        this.comentario = comentario
    }

    public setDataAvaliacao(dataAvaliacao: string): void {
        this.dataAvaliacao = dataAvaliacao
    }
}
