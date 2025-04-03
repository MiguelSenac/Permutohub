export class Troca {
    private id?: number
    private idUsuarioOfertante: number
    private idUsuarioReceptor: number
    private idServicoTrocado: number
    private dataTroca: string

    constructor(idUsuarioOfertante = 0, idUsuarioReceptor = 0, idServicoTrocado = 0, dataTroca = "", id?: number) {
        this.id = id
        this.idUsuarioOfertante = idUsuarioOfertante
        this.idUsuarioReceptor = idUsuarioReceptor
        this.idServicoTrocado = idServicoTrocado
        this.dataTroca = dataTroca
    }

    public getId(): number | undefined {
        return this.id
    }

    public getIdUsuarioOfertante(): number {
        return this.idUsuarioOfertante
    }

    public getIdUsuarioReceptor(): number {
        return this.idUsuarioReceptor
    }

    public getIdServicoTrocado(): number {
        return this.idServicoTrocado
    }

    public getDataTroca(): string {
        return this.dataTroca
    }

    public setId(id: number): void {
        this.id = id
    }

    public setIdUsuarioOfertante(idUsuarioOfertante: number): void {
        this.idUsuarioOfertante = idUsuarioOfertante
    }

    public setIdUsuarioReceptor(idUsuarioReceptor: number): void {
        this.idUsuarioReceptor = idUsuarioReceptor
    }

    public setIdServicoTrocado(idServicoTrocado: number): void {
        this.idServicoTrocado = idServicoTrocado
    }

    public setDataTroca(dataTroca: string): void {
        this.dataTroca = dataTroca
    }
}
