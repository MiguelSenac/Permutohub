export class Solicitacao{
    private id: string
    private usuarioId: string
    private descricao: string
    private habilidadesRequeridas: string[]
    private status: "pendente"|"concluída"

    constructor(id: string, usuarioId: string, descricao: string, habilidadesRequeridas: string[], status: 'pendente' | 'concluída') {
        this.id = id;
        this.usuarioId = usuarioId;
        this.descricao = descricao;
        this.habilidadesRequeridas = habilidadesRequeridas;
        this.status = status;
    }
    
      
    public criarSolicitacao(): void{}
    public editarSolicitacao(): void{}
    public removerSolicitacao(): void{}   
} 