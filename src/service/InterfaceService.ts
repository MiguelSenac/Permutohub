export interface InterfaceService <T>{
    
    listar(): Promise<T[]>

    buscarPorId (id: number): Promise<T | null>

    remover (id: number): Promise<boolean>

    inserir (objeto: T): Promise<T>

    atualizar (id: number, dadosAtualizados: T): Promise<T>

}