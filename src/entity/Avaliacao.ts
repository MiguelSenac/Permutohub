export class Avaliacao{
    private id: string
    private usuarioId: string
    private nota: number
    private comentario: string
    private trocaId: string

    constructor(id: string, usuarioId: string, nota: number, comentario: string, trocaId: string) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.nota = nota;
        this.comentario = comentario;
        this.trocaId = trocaId;
    }
        
      public criarAvaliacao(): void{}
      public visualizarAvaliacao(): void{}
    

}