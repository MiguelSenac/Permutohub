export class Troca{
    private id: string
    private ofertaId: string
    private usuarioOfertanteId: string
    private usuarioSolicitanteId: string
    private status: "pendente"|"concluída"

    constructor(id: string, ofertaId: string, usuarioOfertanteId: string, usuarioSolicitanteId: string, status: "pendente"|"concluída" ){
        this.id = id
        this.usuarioOfertanteId = usuarioOfertanteId 
        this.usuarioSolicitanteId = usuarioSolicitanteId
        this.status = status
    }

    public iniciarTroca(): void{}
    public finalizarTroca():void{}
    public cancelarTroca(): void{}
    public avaliarTroca(): void{}

}