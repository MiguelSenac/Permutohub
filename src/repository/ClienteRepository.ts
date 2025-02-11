import { Pool } from "pg";
import { Database } from "./Database";
import { Cliente } from "../entity/Cliente";

 
export class ClienteRepository{
 
    private pool : Pool ;
 
    constructor(){
        this.pool = Database.iniciarConexao();
    }
 
    async listarClientes():Promise<Cliente[]>{
 
        const query = "SELECT * FROM PUBLIC.CLIENTES";
        const result =  await this.pool.query(query);
 
        const listaClientes: Cliente[] = [];
       
        for(const row of result.rows){
            const cliente = new Cliente(row.nome, row.email,row.telefone,row.id);
            listaClientes.push(cliente);
           
        }
       
       
        return listaClientes;
    }
 
 
}
 