export interface InterfaceRepository<T> {
    mapear(row: any): T

    listar(): Promise<T[]>

    buscarPorId(id: number): Promise<T | null>

    inserir(entidade: T): Promise<T>

    remover(id: number): Promise<boolean>

    atualizar(id: number, entidade: T): Promise<T>
  }
  