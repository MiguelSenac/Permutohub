export class SistemaPermuta{

    public buscarOferta(id: string): Oferta | null{}
    public listarTrocasPendentes(): Troca[]{}
    public realizarTroca(ofertaId: string, solicitacaoId: string): void{}
    public cancelarTroca(trocaId: string): void{}
}