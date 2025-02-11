import { Pool } from "pg";

export class Database{
    static pool : Pool

    static iniciarConexao(){
        this.pool = new Pool({
            user : 'postgres',
            password: '1234',
            host: 'localhost',
            database: 'brasileirao',
            port: 5434
        })

        return this.pool

    }
}  