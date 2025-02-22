import { Servico } from "../entity/Servico"
import { ServicoRepository } from "../repository/ServicoRepository"


export class ServicoService{

    private servicoRepository:ServicoRepository

    constructor() {
        this.servicoRepository = new ServicoRepository()
    }

    
   }