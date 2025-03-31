export interface InterfaceService <T>{
    
    listar(): Promise<T[]>

    buscarPorId (id: string): Promise<T | null>

    remover (id: string): Promise<boolean>

    inserir (objeto: T): Promise<T>

    atualizar (id: string, dadosAtualizados: T): Promise<T>

}