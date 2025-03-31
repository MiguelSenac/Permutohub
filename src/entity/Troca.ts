export class Troca {
    private id?: string
    private idUsuarioOfertante: string
    private idUsuarioReceptor: string
    private idServicoTrocado: string
    private dataTroca: Date

    constructor(
        idUsuarioOfertante = "",
        idUsuarioReceptor = "",
        idServicoTrocado = "",
        dataTroca: string | Date = new Date(),
        id?: string
    ) {
        this.id = id
        this.idUsuarioOfertante = idUsuarioOfertante
        this.idUsuarioReceptor = idUsuarioReceptor
        this.idServicoTrocado = idServicoTrocado
        this.dataTroca = typeof dataTroca === "string" ? new Date(dataTroca) : dataTroca
    }

    public getId(): string | undefined {
        return this.id
    }

    public getIdUsuarioOfertante(): string {
        return this.idUsuarioOfertante
    }

    public getIdUsuarioReceptor(): string {
        return this.idUsuarioReceptor
    }

    public getIdServicoTrocado(): string {
        return this.idServicoTrocado
    }

    public getDataTroca(): Date {
        return this.dataTroca
    }

    public setId(id: string): void {
        this.id = id
    }

    public setIdUsuarioOfertante(idUsuarioOfertante: string): void {
        this.idUsuarioOfertante = idUsuarioOfertante
    }

    public setIdUsuarioReceptor(idUsuarioReceptor: string): void {
        this.idUsuarioReceptor = idUsuarioReceptor
    }

    public setIdServicoTrocado(idServicoTrocado: string): void {
        this.idServicoTrocado = idServicoTrocado
    }

    public setDataTroca(dataTroca: Date): void {
        this.dataTroca = dataTroca
    }
}
