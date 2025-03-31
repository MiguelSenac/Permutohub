export interface InterfaceRepository<T> {
    mapear(row: any): T

    listar(): Promise<T[]>

    buscarPorId(id: string): Promise<T | null>

    inserir(entidade: T): Promise<T>

    remover(id: string): Promise<boolean>

    atualizar(id: string, entidade: T): Promise<T>
  }
  