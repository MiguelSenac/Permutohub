const prompt = require('prompt-sync')()
const { Pool, Query } = require('pg')

const pool = new Pool({
  user: 'postgres',       
  host: 'localhost',         
  database: 'permutohub',   
  password: '1234',     
  port: 5432
})

async function testedb() {
    console.log("Vou iniciar a conexão")
  
    try {
      const client = await pool.connect()
      console.log('Conexão bem-sucedida com o banco PermutoHub!')
      client.release()
      
    } catch (error) {
      console.error('Erro ao conectar ao banco:')
    }
  }

async function inserirTrocas() {
    try{
        const  idOfertante = prompt("ID do usuário ofertante: ")
        const  idReceptor = prompt("ID do usuário receptor: ")
        const  idServico  = prompt("ID do servico: ")
        const  dadosTroca = prompt("Dados da troca: ")
    
      const query = 'INSERT INTO trocas (id_ofertante, id_receptor, id_servico, dados_troca) VALUES ($1, $2, $3, $4)'
      await  pool.query(query, [idOfertante, idReceptor, idServico, dadosTroca])
      console.log("Troca incluída com sucesso!")
    }
    catch(erro){
      console.log("Erro ao adicionar Troca" + erro)
    }
}

async function mostrarTrocas() {
    try{
      const query = 'SELECT * FROM trocas'
      const result = await pool.query(query)
      console.table(result.rows)
    }
    catch{
      console.table("Erro ao mostrar trocas")
    }
  }
  
  async function pesquisarTrocas() {
    const dadosTroca = prompt("Digite os dados da troca que deseja buscar: ")
    
    try {
      const result = await pool.query('SELECT id_trocas, dados_troca FROM trocas WHERE dados_troca ILIKE $1', [`%${dadosTroca}%`])
        console.table(result.rows)
        const  idTroca = prompt("Qual o ID da troca pesquisada: ")
        return idTroca

        
    } catch (erro) {
      console.log("Erro ao buscar a troca." + erro)
    }
  }
  
  async function deletarTrocas() {
  const idTroca = await pesquisarTrocas()
    try {
      await pool.query('DELETE FROM trocas WHERE id_trocas = $1', [idTroca])
      console.log('Troca deletada ID: ' + idTroca)
    } catch (error) {
      console.log("Erro ao deletar a troca." + console.log(error))
    }
}

async function atualizarTrocas() {
    try {
      const idTroca = await pesquisarTrocas()
    
      const novoIdOfertante = prompt("Novo ID para usuário ofertante: ")
      const novoIdReceptor = prompt("Novo ID para usuário receptor: ")
      const novoIdServico = prompt("Novo ID servico: ")
      const novoDadosTroca = prompt("Novos dados para troca: ")
   
      const query = `UPDATE trocas SET id_ofertante = $1, id_receptor = $2, id_servico = $3, dados_troca = $4 WHERE id_trocas = $5`
      await pool.query(query, [novoIdOfertante || null, novoIdReceptor || null, novoIdServico || null, novoDadosTroca || null, idTroca])
      console.log("Troca atualizada com sucesso!")
    } catch{
      console.error("Erro ao atualizar a Troca:")
    }
  }