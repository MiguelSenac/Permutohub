export class Usuario{
    private id: string
    private nome: string
    private email: string
    private senha: string
    private descricao: string
    private habilidades: string[]
    private status: "ativo" | "bloqueado"
    private tipoUsuario: "freelancer" | "empresa"

    constructor(id: string, nome: string, email: string, senha: string, descricao: string, habilidades: string[], status: "ativo" | "bloqueado", tipoUsuario: "freelancer" | "empresa" ){
        this.id = id
        this.nome = nome
        this.email = email
        this.senha = senha
        this.descricao = descricao
        this.habilidades = habilidades
        this.status = status
        this.tipoUsuario = tipoUsuario
    }

    public editarPerfil(novoNome: string, novaDescricao: string, novasHabilidades: string[]): void{
        if(!novoNome || !novaDescricao || novasHabilidades.length === 0){
            throw new Error("Todos os campos são obrigatórios!")
        }

        this.nome = novoNome
        this.descricao = novaDescricao
        this.habilidades = novasHabilidades
    
    }

    public autenticar(senha: string): boolean{
        if(!senha || senha.length < 6){
            throw new Error("[ERRO] A senha precisa ter no mínimo 6 caracteres")
        }

        if(this.autenticarSenha(senha)){
            return true
        }
        else{
            return false
        }
        
    }

    public deletarPerfil(): void{
        if (!this.id){
            throw new Error("[ERRO] ID do usuário não encontrado")
        }
    }

    private autenticarSenha(senha: string): boolean{
        return this.senha === this.senha
    }

    private atualizarStatus(status: "ativo"|"bloqueado"): void{

    }


}